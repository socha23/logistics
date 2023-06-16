import Node from "./node"
import Edge from "./edge"
import Vehicle from "./vehicle"
import generateWorld from './world_gen'

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
        params.from.addOutgoingEdge(r)
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
            edges: this.edges.map(r => r.toView()),
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

    findPathBetween(from, to) {
        // dijkstra's algorithm
        const dist = {}
        const prev = {}
        const unvisited = new Set()

        this.nodes.forEach(n => {
            dist[n.id] = Infinity
            unvisited.add(n)
        })
        dist[from.id] = 0

        while (true) {
            // u = find start node
            var curDist = Infinity
            var u = null
            for (const n of unvisited) {
                if (dist[n.id] < curDist) {
                    curDist = dist[n.id]
                    u = n
                }
            }
            if (u === to) {
                break
            }
            if (u === null) {
                throw new Error("dijkstra")
            }

            unvisited.delete(u)
            for (var eIdx = 0; eIdx < u.outgoingEdges.length; eIdx++) {
                const edge = u.outgoingEdges[eIdx]
                const v = edge.to
                if (unvisited.has(v)) {
                    const alt = dist[u.id] + edge.length
                    if (alt < dist[v.id]) {
                        dist[v.id] = alt
                        prev[v.id] = u
                    }
                }
            }
        }

        if (!prev[to.id]) {
            throw new Error("No path found")
        }

        const path = []
        var u2 = to
        while (u2 !== from) {
            path.push(u2)
            u2 = prev[u2.id]
        }

        path.reverse()

        const result = []
        var a = from
        path.forEach(b => {
            result.push(this.findEdgeBetween(a, b))
            a = b
        })

        return result
        
    }

}

const WORLD = new _World()
generateWorld(WORLD)

export default WORLD