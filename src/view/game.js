import React from "react"
import CityListView from "./cityListView"
import MapView from "./mapView"

const GameView = ({game}) => <div>
    <MapView world={game.world} viewState={game.viewState}/>
    <CityListView cities={game.world.cities}/>
</div> 


export default GameView