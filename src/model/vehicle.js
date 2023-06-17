import WORLD from "./world"

var __vehicle_autoinc = 0

const DEFAULT_VEHICLE_PARAMS = {
    name: "Vehicle",
    maxSpeed: 10,
}


class ActionFollowEdge {

    constructor(vehicle, edge) {
        this.vehicle = vehicle
        this.edge = edge
    }

    onEnter() {
        this.vehicle._enterEdge(this.edge)
    }

    updateState(deltaMs) {
        this.vehicle._followCurrentEdge(deltaMs)    
    }

    isComplete() {
        return this.vehicle._currentEdge !== this.edge
    }

    get waypointPosition() {
        return this.edge.to.position
    }
} 

class VehicleExecutor {
    constructor() {
        this.currentAction = null
        this.actions = []
    }

    enqueue(action) {
        this.actions.push(action)
    }

    cancelCurrentActions() {
        this.currentAction = null
        this.actions = []
    }

    updateState(deltaMs) {
        if (this.currentAction && this.currentAction.isComplete()) {
            this.currentAction = null
            this.actions.splice(0, 1)
        }

        if (this.currentAction === null && this.actions.length > 0) {
            this.currentAction = this.actions[0]
            this.currentAction.onEnter()
        }

        if (this.currentAction) {
            this.currentAction.updateState(deltaMs)
        }
    }
}

export default class Vehicle {

    constructor(params) {
        this.id = "v#" + (__vehicle_autoinc++)        
        params = {
            ...DEFAULT_VEHICLE_PARAMS, 
            name: this.id, 
            ...params}
        
        this.name = params.name
        this._maxSpeed = params.maxSpeed
        
        this._currentNode = params.startingNode
        this._currentEdge = null
        this._currentEdgeDistance = 0

        this._executor = new VehicleExecutor(this)
    }

    commandMoveToNode(node) {
        var nodeFrom = this._currentNode || this._currentEdge.to      
        
        const path = []
        if (this._currentEdge) {
            path.push(this._currentEdge)
        }
        const newPath = WORLD.findPathBetween(nodeFrom, node)
        path.push(...newPath)

        this._executor.cancelCurrentActions()
        path.forEach(e => {
            this._executor.enqueue(new ActionFollowEdge(this, e))
        })
    }

    get currentNode() {
        return this._currentNode
    }

    get currentEdge() {
        return this._currentEdge
    }

    _enterEdge(edge) {
        if (this._currentEdge === edge) {
            // already following, do nothing
        } else if (this._currentNode != null && this._currentNode === edge.from) {
            // start along edge
            this._currentNode = null
            this._currentEdge = edge
            this._currentEdgeDistance = 0
        } else {
            // this is some error state?
            throw new Error("Can't enter edge")
        }
    }

    _followCurrentEdge(deltaMs) {
        this._currentEdgeDistance = Math.max(0, Math.min(this._currentEdge.length,
            this._currentEdgeDistance + this.speed * deltaMs * 0.01
        ))
        if (this._currentEdgeDistance === this._currentEdge.length) {
            // arrived at dest
            this._currentNode = this._currentEdge.to
            this._currentEdge = null
            this._currentEdgeDistance = 0
        }
    }

    get position() {
        if (this._currentNode) {
            return this._currentNode.position
        } else if (this._currentEdge) {
            return this._currentEdge.pointAlong(this._currentEdgeDistance)
        } else {
            throw new Error("Can't determine position")
        }
    }

    get waypointPositions() {
        return this._executor.actions.map(a => a.waypointPosition)
    }

    get speed() {
        return this._maxSpeed
    }

    updateState(deltaMs) {
        this._executor.updateState(deltaMs)
    }

    toView() {
        return {
            id: this.id,
            name: this.name,
            x: this.position.x,
            y: this.position.y,
        }
    }


}