import React, { Component } from "react";
import "./App.css";
import GameBoard from "./components/GameBoard";

class App extends Component {
  render() {
    return (
      <main
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          textAlign: "center",
        }}
      >
        <h1>React: Memory Game Project</h1>
        {/*INSERT GAMEBOARD HERE*/}
        <GameBoard></GameBoard>
        {/*INSERT SCOREBOARD HERE*/}
      </main>
    );
  }
}

export default App;
