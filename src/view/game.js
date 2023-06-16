import React from "react"
import MapView from "./mapView"

const GameView = ({game}) => <div>
    <MapView world={game.world} viewState={game.viewState}/>
</div> 


export default GameView