import React, { Component } from "react";
import "./App.css";
import GameBoard from "./components/GameBoard";

class App extends Component {
  render() {
    return (
      <main>
        <h1>React: Memory Game Project</h1>
        {/*INSERT GAMEBOARD HERE*/}
        <GameBoard>
          {/*The Gameboard Class creates a number of Cards Here*/}
        </GameBoard>
        {/*INSERT SCOREBOARD HERE*/}
      </main>
    );
  }
}

export default App;
