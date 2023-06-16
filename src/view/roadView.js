import React from "react"
import { Point } from "../util/geometry"
import { toDegrees } from "../util/geometry"

export function RoadMapView({road, viewState}) {

    let width=1

    const from = new Point(road.fromX, road.fromY)
    const to = new Point(road.toX, road.toY)

    const vect = from.vectorTo(to)
    const theta = vect.theta
    const style = {
        position: "absolute",
        left: from.x - width / 2,
        top: from.y,

        width: (vect.length + width) || 0,
        height: width,
        backgroundColor: "black",
        transformOrigin: (width / 2) + "px 50%",
    }
    if (theta !== 0) {
        style.transform = "rotate(" + toDegrees(theta) + "deg) "
    }
    return <div style={style}>ROAD</div>
} 