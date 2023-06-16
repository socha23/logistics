import Node from "./node"
import Edge from "./edge"
import Vehicle from "./vehicle"


class _World {
    constructor() {
        this.nodes = []
        this.nodesById = {}
        this.edges = []
        this.vehicles = []
        this.vehiclesById = {}
    }

    addCity(params) {
        const c = new Node(params)
        this.nodes.push(c)
        this.nodesById[c.id] = c
        return c
    }

    addEdge(params) {
        const r = new Edge(params)
        this.edges.push(r)
        return r
    }

    addConnection(nodeA, nodeB) {
        this.addEdge({from: nodeA, to: nodeB})
        this.addEdge({from: nodeB, to: nodeA})
    }

    addVehicle(params) {
        const v = new Vehicle(params)
        this.vehicles.push(v)
        this.vehiclesById[v.id] = v
        return v
    }

    toView() {
        return {
            cities: this.nodes.map(c => c.toView()),
            roads: this.edges.map(r => r.toView()),
            vehicles: this.vehicles.map(v => v.toView())
        }
    }

    updateState(deltaMs) {
        this.vehicles.forEach(v => v.updateState(deltaMs))
    }


    findEdgeBetween(from, to) {
        return this.edges.find(e =>
            (e.from === from && e.to === to)
            ) || null
    }

}

const WORLD = new _World()

const a1 = WORLD.addCity({name: "A1", position: {x: 200, y: 50}})
const a2 = WORLD.addCity({name: "A2", position: {x: 200, y: 250}})

const b1 = WORLD.addCity({name: "B1", position: {x: 300, y: 150}})
WORLD.addConnection(a1, b1)
WORLD.addConnection(a2, b1)

const c1 = WORLD.addCity({name: "C1", position: {x: 400, y: 150}})
WORLD.addConnection(b1, c1)

const d1 = WORLD.addCity({name: "D1", position: {x: 500, y: 50}})
WORLD.addConnection(c1, d1)

const d2 = WORLD.addCity({name: "D2", position: {x: 500, y: 250}})
WORLD.addConnection(c1, d2)


WORLD.addVehicle({name: "V1", maxSpeed: 20, startingNode: a1})

export default WORLD