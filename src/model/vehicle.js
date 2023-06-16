var __vehicle_autoinc = 0

const DEFAULT_VEHICLE_PARAMS = {
    name: "Vehicle",
    maxSpeed: 10,
}


class ActionFollowEdge {
    constructor(edge, direction) {
        this.edge = edge
        this.direction = direction
    }

    updateState(deltaMs, vehicle) {
        vehicle.moveAlongEdge(deltaMs, this.edge, this.direction)    
    }

    isComplete(vehicle) {
        return vehicle.location instanceof LocationInNode

    }
} 

class LocationAlongEdge {
    constructor(edge, distance) {
        this.edge = edge
        this.distance = distance
    }

    get position() {
        return this.edge.pointAlong(this.distance)
    }
 }

 class LocationInNode {
    constructor(node) {
        this.node = node
    }

    get position() {
        return this.node.position
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
        
        const edge = params.road
        this.location = new LocationInNode(edge.from)
        this.commandFollowEdge(edge, 1)
    }

    commandFollowEdge(edge, direction) {
        this._setLocationOnEdge(edge)
        this._action = new ActionFollowEdge(edge, direction)
    }

    currentNode() {
        if (this.location instanceof LocationInNode) {
            return this.location.node
        } else {
            return null
        }
    }

    currentEdge() {
        if (this.location instanceof LocationAlongEdge) {
            return this.location.edge
        } else {
            return null
        }
    }

    _setLocationOnEdge(edge) {
        // either we're on start of the edge...
        if (this.currentNode() === edge.from) {
            this.location = new LocationAlongEdge(edge, 0)
        } 
        // or at the end...        
        else if (this.currentNode() === edge.to) {
            this.location = new LocationAlongEdge(edge, edge.length)
        } 
        // or we're on the edge already
        else if (this.currentEdge() === edge) {
            // no need to do anything
        }
        // or we in some error state
        else {
            throw new Error("Can't set location on edge")
        }
    }

    moveAlongEdge(deltaMs, edge, direction) {
        this.location.distance = Math.max(0, Math.min(edge.length,
            this.location.distance + this.speed * deltaMs * 0.01 * direction
        ))
        if (direction < 0 && this.location.distance === 0) {
            this.location = new LocationInNode(edge.from)
            
        } else if (direction > 0 && this.location.distance === edge.length) {
            this.location = new LocationInNode(edge.to)
        }
    }

    get position() {
        return this.location.position
    }

    get speed() {
        return this._maxSpeed
    }

    updateState(deltaMs) {
        if (this._action != null) {
            this._action.updateState(deltaMs, this)
            if (this._action.isComplete(this)) {                
                this.onActionComplete(this._action)
                this._action = null
            }    
        }
    }

    onActionComplete(action) {
        console.log("Action complete", action)
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