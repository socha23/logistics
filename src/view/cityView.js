import React from "react"

import VIEW_CONTROLLER from "./viewController"
import { MAP_STYLES } from "./styles";

const CLICK_OVERLAY_MARGIN = 10

export const CityMapView = ({city, viewState}) => <div>
    <div style={{
        position: "absolute",
        left: -MAP_STYLES.CITY.size / 2 - CLICK_OVERLAY_MARGIN,
        top: -MAP_STYLES.CITY.size / 2 - CLICK_OVERLAY_MARGIN,
        width: MAP_STYLES.CITY.size + 2 * CLICK_OVERLAY_MARGIN,
        height: MAP_STYLES.CITY.size + 2 * CLICK_OVERLAY_MARGIN,
        zIndex: 50,
    }}
        onClick={() => VIEW_CONTROLLER.onClickCity(city.id)}
        onMouseOver={() => VIEW_CONTROLLER.onMouseOverCity(city.id)}
        onMouseOut={() => VIEW_CONTROLLER.onMouseOutCity(city.id)}
        onContextMenu={e => {VIEW_CONTROLLER.onRightClickCity(city.id); e.stopPropagation(); e.preventDefault(); return false}}
    >
    </div>
    <div style={{
        ...MAP_STYLES.CITY,
        position: "absolute",
        left: -MAP_STYLES.CITY.size / 2,
        top: -MAP_STYLES.CITY.size / 2,
        width: MAP_STYLES.CITY.size,
        height: MAP_STYLES.CITY.size,
    }}
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
