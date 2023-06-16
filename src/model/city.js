import { Point } from "../util/geometry"

var __city_autoinc = 0

const DEFAULT_CITY_PARAMS = {
    name: "Unnamed city",
    position: {x: 0, y: 0}
}

export default class City {

    constructor(params) {
        this.id = "city#" + (__city_autoinc++)
        params = {
            ...DEFAULT_CITY_PARAMS, 
            name: this.id, 
            ...params}
        this._position = new Point(params.position.x, params.position.y)
        this._name = params.name
    }

    get position() {
        return this._position
    }

    toView() {
        return {
            id: this.id,
            name: this._name,
            x: this.position.x,
            y: this.position.y,
        }
    }


}