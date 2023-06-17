import React from "react"
import { CityMapView } from "./cityView"
import { RoadMapView } from "./roadView"
import { VehicleMapView } from "./vehicleView"
import { FocusRing } from "./mapOverlays"

import VIEW_CONTROLLER from "./viewController"

const MAP_WIDTH = 1000
const MAP_HEIGHT = 700


const MapObject = ({x, y, children}) => <div style={{
    position: "absolute",
    top: y,
    left: x,
}}>
    {children}
</div>

const MapView = ({world, viewState}) => <div style={{
    width: MAP_WIDTH,
    height: MAP_HEIGHT,
    border: "1px solid black",
}}
    onContextMenu={e => {VIEW_CONTROLLER.onRightClickMap(); e.preventDefault()}}
>
{
        world.edges.map(c => 
            <MapObject key={c.id} x={c.fromX} y={c.fromY}>
                <RoadMapView road={c} viewState={viewState}/>
            </MapObject>
        )
    }
    {
        world.cities.map(c => 
            <MapObject key={c.id} x={c.x} y={c.y}>
                <FocusRing objectId={c.id} viewState={viewState}/>
                <CityMapView city={c} viewState={viewState}/>
            </MapObject>
        )
    }
    {
        world.vehicles.map(c => 
            <MapObject key={c.id} x={c.x} y={c.y}>
                <FocusRing objectId={c.id} viewState={viewState}/>
                <VehicleMapView vehicle={c} viewState={viewState}/>
            </MapObject>
        )
    }
</div>




export default MapView