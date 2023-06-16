import React from "react"

import VIEW_CONTROLLER from "./viewController"

const CITY_ICON_SIZE = 30

export const CityMapView = ({city, viewState}) => <div>
    <div style={{
        position: "absolute",
        left: -CITY_ICON_SIZE/2,
        top: -CITY_ICON_SIZE/2,
        width: CITY_ICON_SIZE,
        height: CITY_ICON_SIZE,
        backgroundColor: "white",
        border: "3px solid " + (viewState.focusedObjectId === city.id ? "red" : "#000"),
        borderRadius: CITY_ICON_SIZE,
    }}
        onClick={() => VIEW_CONTROLLER.onClickCity(city.id)}
        onContextMenu={e => {VIEW_CONTROLLER.onRightClickCity(city.id); e.stopPropagation(); e.preventDefault(); return false}}
    >
    </div>
    <div style={{
        position: "absolute",
        left: -20,
        top: 20,
    }}>
        {city.name}
    </div>
</div>
