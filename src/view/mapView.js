import React from "react"
import { CityMapView } from "./cityView"
import { RoadMapView } from "./roadView"
import { VehicleMapView } from "./vehicleView"
import VIEW_CONTROLLER from "./viewController"

const MAP_WIDTH = 1000
const MAP_HEIGHT = 400


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
        world.roads.map(c => 
            <MapObject key={c.id} x={c.x} y={c.y}>
                <RoadMapView road={c} viewState={viewState}/>
            </MapObject>
        )
    }
    {
        world.cities.map(c => 
            <MapObject key={c.id} x={c.x} y={c.y}>
                <CityMapView city={c} viewState={viewState}/>
            </MapObject>
        )
    }
    {
        world.vehicles.map(c => 
            <MapObject key={c.id} x={c.x} y={c.y}>
                <VehicleMapView vehicle={c} viewState={viewState}/>
            </MapObject>
        )
    }
</div>




export default MapView