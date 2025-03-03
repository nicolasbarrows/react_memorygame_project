import React, { Component } from "react";
import ScoreBoard from "./ScoreBoard";
import Card from "./Card";

class GameBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      numCards: 8, //how many cards to generate
      allCards: [], // Stores shuffled card values as numbers
      flippedCards: [], // stores the indeces of currently revealed cards
      prevCardValue: null,
      prevCardIndex: null,
      matchSuccess: false,
      matchCount: 0,
      tryCount: 0,
      highScore: null,
      win: false,
      feedback: "Click on Any Card.",
    };

    this.createBoard = this.createBoard.bind(this);
    this.shuffleBoard = this.shuffleBoard.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.setState((prevState) => ({
      allCards: this.newGame(this.state.numCards),
    }));
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.matchCount !== this.state.matchCount &&
      this.state.matchCount === this.state.allCards.length / 2
    ) {
      this.isGameOver();
    }
  }

  newGame(num) {
    const numberOfCards = num; //use this to change how many cards are created
    const board = this.createBoard(numberOfCards);
    const shuffled = this.shuffleBoard(board);
    return shuffled;
  }

  createBoard(cardNumber) {
    //takes in cardNumber : the total number of total cards to be displayed
    //create and return an array, each array item is the number value of each card
    const matches = cardNumber / 2; //number of possible matches
    const matchesArr = Array.from({ length: matches }, (_, i) => i);
    const cardArr = matchesArr.concat(matchesArr);

    this.setState({ win: false });

    return cardArr;
  }

  shuffleBoard(array) {
    //takes in an array and returns a new array with the same values in a random order
    const shuffled = array.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
  }

  handleClick(cardValue, cardIndex) {
    if (this.state.flippedCards.includes(cardIndex)) {
      //Ignore clicks on flipped Cards
      return;
    }

    this.setState((prevState) => ({
      //update the click count score
      tryCount: prevState.tryCount + 1,
    }));

    //Check chosen card against previous Card
    if (this.state.prevCardValue === null) {
      //FIRST CARD FLIPPED
      this.setState({
        prevCardValue: cardValue,
        prevCardIndex: cardIndex,
        flippedCards: [...this.state.flippedCards, cardIndex],
        feedback: "Now click on Another Card",
      });
    } else if (cardValue === this.state.prevCardValue) {
      //SECOND DARD FLIPPED -> A MATCH!
      this.setState((prevState) => ({
        prevCardValue: null,
        prevCardIndex: null,
        flippedCards: [...this.state.flippedCards, cardIndex],
        matchSuccess: true,
        matchCount: prevState.matchCount + 1,
        feedback: "Great job, you found a Match! Try to find more.",
      }));
    } else {
      //SECOND CARD FLIPPED -> NO MATCH!
      this.setState((prevState) => ({
        flippedCards: [...this.state.flippedCards, cardIndex],
        feedback: "So sorry. Not a match. Try again.",
      }));
      setTimeout(() => {
        this.setState((prevState) => ({
          tryCount: prevState.tryCount + 1,
          matchSuccess: false,
          prevCardIndex: null,
          prevCardValue: null,
          flippedCards: [],
          matchCount: 0,
        }));
      }, 1000);
    }

    return null;
  }

  isGameOver() {
    //update HighScore if applicable
    if (
      this.state.highScore === null ||
      this.state.tryCount < this.state.highScore
    ) {
      this.setState({
        highScore: this.state.tryCount,
      });
    }
    this.setState((prevState) => ({
      feedback: "Congratulations! You Win!",
    }));
    setTimeout(() => {
      //the game is over
      //after some time reset and shuffle a new board
      const newCardArray = this.newGame(this.state.numCards);
      this.setState((prevState) => ({
        allCards: newCardArray,
        flippedCards: [],
        prevCardValue: null,
        prevCardIndex: null,
        matchSuccess: false,
        matchCount: 0,
        tryCount: 0,
        win: false,
        feedback: "Now can you beat your score?",
      }));
    }, 2000);
  }

  render() {
    return (
      <div className="appRender">
        {/*User feedback text is here*/}
        <h1>{this.state.feedback}</h1>
        {/*a button to reset the game only visible after gameover*/}
        <button
          className="restartButton"
          style={{ visibility: this.state.win ? "visible" : "hidden" }}
        >
          Play Again
        </button>
        {/*The game Cards are here*/}
        <ul className="gameBoard">
          {this.state.allCards.map((value, idx) => (
            <Card
              flippedCardsArray={this.state.flippedCards}
              cardValue={value}
              cardIndex={idx}
              onCardClick={this.handleClick}
            ></Card>
          ))}
        </ul>
        {/*The footer score display is here*/}
        <ScoreBoard
          highScore={this.state.highScore}
          tryCount={this.state.tryCount}
          matchCount={this.state.matchCount}
        />
      </div>
    );
  }
}

export default GameBoard;
