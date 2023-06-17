import React from "react"

import VIEW_CONTROLLER from "./viewController"
import { MAP_STYLES } from "./styles";

export const CityMapView = ({city, viewState}) => <div>
    <div style={{
        ...MAP_STYLES.CITY,
        position: "absolute",
        left: -MAP_STYLES.CITY.size / 2,
        top: -MAP_STYLES.CITY.size / 2,
        width: MAP_STYLES.CITY.size,
        height: MAP_STYLES.CITY.size,
    }}
        onClick={() => VIEW_CONTROLLER.onClickCity(city.id)}
        onMouseOver={() => VIEW_CONTROLLER.onMouseOverCity(city.id)}
        onMouseOut={() => VIEW_CONTROLLER.onMouseOutCity(city.id)}
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
