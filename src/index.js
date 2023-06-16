import React, { useEffect, useRef, useState } from "react";
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

import GameView from './view/game'
import WORLD from './model/world';
import VIEW_CONTROLLER from './view/viewController';
import { OrderExecutor } from "./view/orderExecutor";


class Game {
  constructor() {
      this.viewController = VIEW_CONTROLLER
      this.world = WORLD
      this.orderExecutor = new OrderExecutor(WORLD)
      this.lastStateUpate = window.performance.now()
  }

  updateState() {
      var time = window.performance.now()
      var delta = time - this.lastStateUpate
      if (delta > 0) {
        this.viewController.apply(this.world, this.orderExecutor)
        this.world.updateState(delta)
        this.lastStateUpate = time
      }
  }

  toView() {
    return {
      world: this.world.toView(),
      viewState: this.viewController.toView(),
    }

  }


}

// from https://codesandbox.io/s/requestanimationframe-with-hooks-0kzh3?from-embed
const useAnimationFrame = (callback) => {
  const requestRef = React.useRef()
  const previousTimeRef = React.useRef()
  React.useEffect(() => {
      const animate = time => {
          if (previousTimeRef.current !== undefined) {
              const deltaMs = time - previousTimeRef.current
              callback(deltaMs)
          }
          previousTimeRef.current = time
          requestRef.current = requestAnimationFrame(animate)
      }
      requestRef.current = requestAnimationFrame(animate)
      return () => cancelAnimationFrame(requestRef.current)
  }, [callback])
}

function RunningGameView({game}) {
  const [gameState, setGameState] = useState(game.toView())
  const mainDivRef = useRef(null)

  useEffect(() => {
      if (mainDivRef.current) {
          mainDivRef.current.focus()
      }
  }, [])

  useAnimationFrame(deltaMs => {
      game.updateState()
      setGameState(game.toView())
  })

  return (
      <div
          ref={mainDivRef}
          tabIndex={0}
      >
          <GameView game={gameState}/>
      </div>
  );
}

function App() {
  const game = new Game()

  return (
      <div className="app">
          <RunningGameView game={game}/>
      </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
