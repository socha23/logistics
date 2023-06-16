import React from "react"
import { Point } from "../util/geometry"
import { toDegrees } from "../util/geometry"

export function RoadMapView({road, viewState}) {

    let ROAD_WIDTH=10
    const MARGIN_BETWEEN_ROADS = 4

    const from = new Point(road.fromX, road.fromY)
    const to = new Point(road.toX, road.toY)

    const vect = from.vectorTo(to)
    const theta = vect.theta
    const style = {
        position: "absolute",
        //height: ROAD_WIDTH + MARGIN_BETWEEN_ROADS,
        height: ROAD_WIDTH,
        top: -ROAD_WIDTH/2,
        transformOrigin: "0 50%",
    }
    if (theta !== 0) {
        style.transform = "rotate(" + toDegrees(theta) + "deg) "
    }
    return <div style={style}>
        <div style={{
            width: vect.length,
            //top: -ROAD_WIDTH - MARGIN_BETWEEN_ROADS,
            height: ROAD_WIDTH,
            border: "1px solid black",
            position: "absolute",
            marginBottom: MARGIN_BETWEEN_ROADS,
        }}>
        </div>
    </div>
} 