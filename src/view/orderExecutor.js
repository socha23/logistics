export class OrderExecutor {
    constructor(world) {
        this.world = world
    }

    onMoveToNode(vehicle, node) {
        // vehicle can be on edge or in node
        const e = vehicle.currentEdge
        const n = vehicle.currentNode
        // in node that is connected with requested node - issue command to follow
        if (n && this.world.findEdgeBetween(n, node)) {
            const dstE = this.world.findEdgeBetween(n, node)
            vehicle.commandFollowEdge(dstE)
        }
        // already on edge leading to node - issue command to follow
        else if (e && (e.to === node)) {
            vehicle.commandFollowEdge(e)
        }
        // already on edge leading from node, but there is opposite - issue command to follow that
        else if (e && (e.from === node)) {
            const opposite = this.world.findEdgeBetween(e.to, e.from)
            if (opposite) {
                vehicle.commandFollowEdge(opposite)
            }            
        }
        // otherwise command cannot be fulfilled
        else {
            console.log("MOVE TO NODE CANNOT BE FULFILLED")
        }
    }    
}

