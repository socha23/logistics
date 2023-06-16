var __vehicle_autoinc = 0

const DEFAULT_VEHICLE_PARAMS = {
    name: "Vehicle",
    maxSpeed: 10,
}


class ActionFollowEdge {
    updateState(deltaMs, vehicle) {
        vehicle._followEdge(deltaMs)    
    }

    isComplete(vehicle) {
        return vehicle._currentNode != null
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
    }

    commandFollowEdge(edge) {
        if (this._currentEdge === edge) {
            // already following, do nothing
        } else if (this._currentEdge != null 
            && this._currentEdge.from === edge.to 
            && this._currentEdge.to === edge.from) {
            // already following opposite edge, reverse
            const newEdgeDistance = this._currentEdge.length - this._currentEdgeDistance
            this._currentEdgeDistance = newEdgeDistance
            this._currentEdge = edge
        } else if (this._currentNode != null && this._currentNode === edge.from) {
            // start along edge
            this._currentNode = null
            this._currentEdge = edge
            this._currentEdgeDistance = 0
        } else {
            // this is some error state?
            throw new Error("Can't follow edge")
        }
        this._action = new ActionFollowEdge()
    }

    get currentNode() {
        return this._currentNode
    }

    get currentEdge() {
        return this._currentEdge
    }

    _followEdge(deltaMs) {
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

    get speed() {
        return this._maxSpeed
    }

    updateState(deltaMs) {
        if (this._action != null) {
            this._action.updateState(deltaMs, this)
            if (this._action.isComplete(this)) {                
                this._action = null
            }    
        }
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