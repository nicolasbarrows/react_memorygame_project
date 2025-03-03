import React, { Component } from "react";
import "./App.css";
import GameBoard from "./components/GameBoard";

class App extends Component {
  render() {
    return (
      <main>
        <GameBoard>
          {/*The Gameboard Class creates a header Here*/}
          {/*The Gameboard Class creates a number of Cards Here*/}
          {/*The Gameboard Class creates Scoreboard Here*/}
        </GameBoard>
      </main>
    );
  }
}

export default App;
