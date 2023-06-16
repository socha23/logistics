import { Point } from '../util/geometry'
import {transpose, randomElem} from '../util/utils'


const DEFAULT_PARAMS = {
    position: new Point(0, 0),

    minX: 0,
    maxX: 1000,
    minY: 0,
    maxY: 700,

    
    nodeMargin: 40,
    nodeCount: 15,
    nodeMinDistance: 100,

    pathGenerationChaos: 100,
}


export default function generate(w, params) {
    params = {
        ...DEFAULT_PARAMS,
        ...params
    }
    generateNodes(w, params)
    
    generateRoads(w, randomElem(w.nodes), params)
    generateRoads(w, randomElem(w.nodes), params)

    w.addVehicle({name: "V1", maxSpeed: 10, startingNode: randomElem(w.nodes)})
    w.addVehicle({name: "V2", maxSpeed: 10, startingNode: randomElem(w.nodes)})
    w.addVehicle({name: "V3", maxSpeed: 10, startingNode: randomElem(w.nodes)})
}







function randomPoint(params) {
    const minX = params.minX + params.nodeMargin
    const maxX = params.maxX - params.nodeMargin

    const minY = params.minY + params.nodeMargin
    const maxY = params.maxY - params.nodeMargin

    return new Point(
        transpose(Math.random(), 0, 1, minX, maxX),
        transpose(Math.random(), 0, 1, minY, maxY)
    )
}

function randomPointDistancedFromExisting(params, points) {
    for (var recount = 0; recount < 100; recount++) {
        const p = randomPoint(params)
        if (points.some(n => n.inRange(p, params.nodeMinDistance))) {
            continue
        }
        return p
    }
    throw new Error("Can't find point for node")
}


function generateNodes(world, params) {
    const points = []
    for (var i = 0; i < params.nodeCount; i++) {
        points.push(randomPointDistancedFromExisting(params, points))
    }
    for (const p of points) {
        world.addCity({position: p})
    }
}

function generateRoads(world, fromNode, params) {
    const nodesLeft = world.nodes.filter(c => c != fromNode)
    const nodesProcessed = [fromNode]

    while (nodesLeft.length > 0) {
        var srcNode = null
        var dstNode = null
        var distance = Infinity

        for (var sI = 0; sI < nodesProcessed.length; sI++) {
            for (var sJ = 0; sJ < nodesLeft.length; sJ++) {
                var dist = nodesProcessed[sI].position.distanceTo(nodesLeft[sJ].position)
                // let's add some chaos...
                dist += Math.random() * params.pathGenerationChaos
                if (dist < distance) {
                    distance = dist
                    srcNode = nodesProcessed[sI]
                    dstNode = nodesLeft[sJ]
                }
            }
        }
        if (!world.findEdgeBetween(srcNode, dstNode)) {
            world.addConnection(srcNode, dstNode)
        }
        nodesLeft.splice(nodesLeft.indexOf(dstNode), 1)
        nodesProcessed.push(dstNode)
    }
}


