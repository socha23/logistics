import React from "react"

import VIEW_CONTROLLER from "./viewController"

const VEHICLE_ICON_SIZE = 20
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
    >
    </div>

    <div style={{
        position: "absolute",
        left: -VEHICLE_ICON_SIZE/2,
        top: -VEHICLE_ICON_SIZE/2,
        width: VEHICLE_ICON_SIZE,
        height: VEHICLE_ICON_SIZE,
        zIndex: 0,
        backgroundColor: (viewState.focusedObjectId === vehicle.id ? "red" : "#000"),
        borderRadius: VEHICLE_ICON_SIZE,

    }}
    >
    </div>
</div>
