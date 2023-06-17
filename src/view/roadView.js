import React from "react"
import { Point } from "../util/geometry"
import { toDegrees } from "../util/geometry"

import { MAP_STYLES } from "./styles"

export function RoadMapView({road, viewState}) {

    const vect = new Point(road.fromX, road.fromY)
        .vectorTo(new Point(road.toX, road.toY))
    const theta = vect.theta

    const style = {
        top: Math.cos(theta) * MAP_STYLES.ROAD.laneDistance / 2,
        left: -Math.sin(theta) * MAP_STYLES.ROAD.laneDistance / 2,
        position: "absolute",
        transformOrigin: "0 0",
    }
    if (theta !== 0) {
        style.transform = "rotate(" + toDegrees(theta) + "deg) "
    }

    return <div style={style}>
        <div style={{
            ...MAP_STYLES.ROAD,
            position: "absolute",
            width: vect.length,
            height: MAP_STYLES.ROAD.size, 
            top: -MAP_STYLES.ROAD.size / 2,
        }}>
        </div>
    </div>
} 