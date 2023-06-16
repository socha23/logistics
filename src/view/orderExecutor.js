export class OrderExecutor {
    constructor(world) {
        this.world = world
    }

    onMoveToNode(vehicle, node) {
        // vehicle can be on edge or in node
        const e = vehicle.currentEdge()
        const n = vehicle.currentNode()
        // in node that is connected with requested node - issue command to follow
        if (n && this.world.findEdgeBetween(n, node)) {
            const dstE = this.world.findEdgeBetween(n, node)
            vehicle.commandFollowEdge(dstE, dstE.from === node ? -1 : 1)
        }

        // on edge connecting to node - issue command to follow
        else if (e && (e.from === node || e.to === node)) {
            vehicle.commandFollowEdge(e, e.from === node ? -1 : 1)
        }
        // otherwise command cannot be fulfilled
        else {
            console.log("MOVE TO NODE CANNOT BE FULFILLED")
        }
    }    
}

