import React from "react"

import VIEW_CONTROLLER from "./viewController"
import { MAP_STYLES } from "./styles";

const CLICK_OVERLAY_SIZE = 40

export const VehicleMapView = ({vehicle, viewState}) => <div style={{
    position: "relative",
}}>

    <div style={{
        position: "absolute",
        left: -CLICK_OVERLAY_SIZE/2,
        top: -CLICK_OVERLAY_SIZE/2,
        width: CLICK_OVERLAY_SIZE,
        height: CLICK_OVERLAY_SIZE,
        zIndex: 100,

    }}
        onClick={() => VIEW_CONTROLLER.onClickVehicle(vehicle.id)}
        onMouseOver={() => VIEW_CONTROLLER.onMouseOverVehicle(vehicle.id)}
        onMouseOut={() => VIEW_CONTROLLER.onMouseOutVehicle(vehicle.id)}
    >
    </div>

    <div style={{
        ...MAP_STYLES.VEHICLE,
        position: "absolute",
        left: -MAP_STYLES.VEHICLE.size /2,
        top: -MAP_STYLES.VEHICLE.size /2,
        width: MAP_STYLES.VEHICLE.size ,
        height: MAP_STYLES.VEHICLE.size ,
        zIndex: 0,
        borderRadius: MAP_STYLES.VEHICLE.size,
    }}
    >
    </div>
</div>
