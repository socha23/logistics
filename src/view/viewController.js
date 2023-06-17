import WORLD from "../model/world";

const FOCUS_NONE = 0;
const FOCUS_CITY = 1;
const FOCUS_VEHICLE = 2;

const RIGHT_NONE = 0;
const RIGHT_CITY = 1;

class ViewController {
    constructor() {
        this.focusedObjectId = ""
        this._focusState = FOCUS_NONE
                
        this.rightClickedId = ""
        this._rightState = RIGHT_NONE

        this.hoverId = ""
        this.hoverPath = null
    }

    onClickCity(cityId) {
        this.focusedObjectId = cityId
        this._focusState = FOCUS_CITY
    }

    onClickVehicle(vehicleId) {
        this.focusedObjectId = vehicleId
        this._focusState = FOCUS_VEHICLE
    }

    onRightClickCity(cityId) {
        this.rightClickedId = cityId
        this._rightState = RIGHT_CITY
    }

    onMouseOverCity(cityId) {
        this.hoverId = cityId
    }

    onMouseOutCity(cityId) {
        if (this.hoverId === cityId) {
            this.hoverId = ""
            this.hoverPath = null
        }
    }

    onMouseOverVehicle(vehicleId) {
        this.hoverId = vehicleId
    } 

    onMouseOutVehicle(vehicleId) {
        if (this.hoverId === vehicleId) {
            this.hoverId = ""
        }

    }

    onRightClickMap() {
        this.focusedObjectId = ""
        this._focusState = FOCUS_NONE
    }

    isFocused(object) {
        return this.focusedObjectId === object.id
    }

    apply(orderExecutor) {
        const focusedVehicle = WORLD.vehiclesById[this.focusedObjectId]
        const rightClickedCity = WORLD.nodesById[this.rightClickedId]
        const hoverCity = WORLD.nodesById[this.hoverId]


        if (focusedVehicle && rightClickedCity) {
            orderExecutor.onMoveToNode(focusedVehicle, rightClickedCity)
        }
        this._rightState = RIGHT_NONE
        this.rightClickedId = ""

        if (focusedVehicle && hoverCity) {
                const nodeFrom = focusedVehicle.currentNode ? focusedVehicle.currentNode : focusedVehicle.currentEdge.to
                if (hoverCity !== nodeFrom) {
                    const path = WORLD.findPathBetween(nodeFrom, hoverCity)
                    if (path) {
                        // hover path found
                        this.hoverPath = [focusedVehicle.position, nodeFrom.position, ...path.map(e => e.to.position)]
                    }    
                }                
        }
    }

    toView() {
        const focusedPath = []
        const focusedVehicle = WORLD.vehiclesById[this.focusedObjectId]
        if (focusedVehicle) {
            focusedPath.push(focusedVehicle.position)
            focusedPath.push(...focusedVehicle.waypointPositions)
        }

        return {
            focusedObjectId: this.focusedObjectId,
            focusedPath: focusedPath,
            hoverObjectId: this.hoverId,
            hoverPath: this.hoverPath || [],
        }
    }
}

const VIEW_CONTROLLER = new ViewController()

export default VIEW_CONTROLLER