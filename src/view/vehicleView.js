import React from "react"

import VIEW_CONTROLLER from "./viewController"

const VEHICLE_ICON_SIZE = 20

export const VehicleMapView = ({vehicle, viewState}) => <div>
    <div style={{
        position: "absolute",
        left: -VEHICLE_ICON_SIZE/2,
        top: -VEHICLE_ICON_SIZE/2,
        width: VEHICLE_ICON_SIZE,
        height: VEHICLE_ICON_SIZE,
        backgroundColor: (viewState.focusedObjectId === vehicle.id ? "red" : "#000"),
        borderRadius: VEHICLE_ICON_SIZE,

    }}
        onClick={() => VIEW_CONTROLLER.onClickVehicle(vehicle.id)}
    >
    </div>
</div>
