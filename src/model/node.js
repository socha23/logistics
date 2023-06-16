import { Point } from "../util/geometry"

var __node_autoinc = 0

const DEFAULT_NODE_PARAMS = {
    name: "Unnamed node",
    position: {x: 0, y: 0}
}

export default class Node {

    constructor(params) {
        this.id = "node#" + (__node_autoinc++)
        params = {
            ...DEFAULT_NODE_PARAMS, 
            name: this.id, 
            ...params}
        this._position = new Point(params.position.x, params.position.y)
        this._name = params.name

        this.outgoingEdges = []
    }

    addOutgoingEdge(e) {
        this.outgoingEdges.push(e)
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