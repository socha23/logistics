const FOCUS_NONE = 0;
const FOCUS_CITY = 1;
const FOCUS_VEHICLE = 2;

const RIGHT_NONE = 0;
const RIGHT_CITY = 1;
const RIGHT_VEHICLE = 2;


class ViewController {
    constructor() {
        this.focusedObjectId = ""
        this.rightClickedId = ""
        this._focusState = FOCUS_NONE
        this._rightState = RIGHT_NONE
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

    onRightClickMap() {
        this.focusedObjectId = ""
        this._focusState = FOCUS_NONE
    }

    isFocused(object) {
        return this.focusedObjectId === object.id
    }

    apply(world, orderExecutor) {
        if (this._focusState === FOCUS_VEHICLE && this._rightState === RIGHT_CITY) {
            const vehicle = world.vehiclesById[this.focusedObjectId]
            const node = world.citiesById[this.rightClickedId]
            
            orderExecutor.onMoveToNode(vehicle, node)
        }
        this._rightState = RIGHT_NONE
        this.rightClickedId = ""
    }




    toView() {
        return {
            focusedObjectId: this.focusedObjectId
        }
    }
}

const VIEW_CONTROLLER = new ViewController()

export default VIEW_CONTROLLER