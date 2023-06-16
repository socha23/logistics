export class OrderExecutor {
    constructor(world) {
        this.world = world
    }

    onMoveToNode(vehicle, node) {
        vehicle.commandMoveToNode(node)
    }    
}

