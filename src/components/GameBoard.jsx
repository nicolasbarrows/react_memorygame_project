import { Component } from "react";

class GameBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allCards: [], // Stores shuffled card values as numbers
      flippedCards: [], // stores the indeces of currently revealed cards
      prevCardValue: null,
      prevCardIndex: null,
      matchSuccess: false,
      matchCount: 0,
      tryCount: 0,
      highScore: 0,
      win: false,
    };

    this.createBoard = this.createBoard.bind(this);
    this.shuffleBoard = this.shuffleBoard.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.newGame();
  }

  newGame() {
    const numberOfCards = 16; //use this to change how many cards are created
    const board = this.createBoard(numberOfCards);
    const shuffled = this.shuffleBoard(board);
    this.setState({ allCards: shuffled }, () => {
      console.log(`ComponentDidMount - Created ${this.state.allCards}`);
    });
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
      tryCount: prevState.tryCount + 1,
    }));
    //Check chosen card against previous Card

    if (this.state.prevCardValue === null) {
      //FIRST CARD FLIPPED
      this.setState({
        prevCardValue: cardValue,
        prevCardIndex: cardIndex,
        flippedCards: [...this.state.flippedCards, cardIndex],
      });
    } else if (cardValue === this.state.prevCardValue) {
      //SECOND CARD FLIPPED -> A MATCH!
      this.setState(
        (prevState) => ({
          prevCardValue: null,
          prevCardIndex: null,
          flippedCards: [...this.state.flippedCards, cardIndex],
          matchSuccess: true,
          matchCount: prevState.matchCount + 1,
        }),
        () => {
          //check to see if the Game is Over
          this.isGameOver();
        }
      );
      console.log("Match Found");
    } else {
      this.setState((prevState) => ({
        flippedCards: [...this.state.flippedCards, cardIndex],
      }));
      //SECOND CARD FLIPPED -> NO MATCH!
      setTimeout(() => {
        this.setState((prevState) => ({
          tryCount: prevState.tryCount + 1,
          matchSuccess: false,
          prevCardIndex: null,
          prevCardValue: null,
          flippedCards: [],
        }));
      }, 1000);

      console.log("No Match: restart");
    }

    return null;
  }

  isGameOver() {
    if (this.state.matchCount === this.state.allCards.length / 2) {
      //update HighScore if applicable
      if (this.state.tryCount < this.state.highScore) {
        this.setState({ highScore: this.state.tryCount });
      }
      //after some time reset and shuffle a new board
      setTimeout(() => {
        console.log("GAME OVER. YOU WIN!");
        this.newGame();
        this.setState((prevState) => ({
          allCards: [],
          flippedCards: [],
          prevCardValue: null,
          prevCardIndex: null,
          matchSuccess: false,
          matchCount: 0,
          tryCount: 0,
          win: false,
        }));
      }, 2000);
    } else {
      console.log("CONTINUE PLAYING");
    }
  }

  render() {
    return (
      //render values of allCards to the DOM as a list
      <div>
        <ul className="gameBoard">
          {this.state.allCards.map((name, idx) => (
            <li
              className={`card ${
                this.state.flippedCards.includes(idx) ? "flipped" : ""
              }`}
              id={idx}
              onClick={() => {
                this.handleClick(name, idx);
              }}
              key={idx}
            >
              {name}
            </li>
          ))}
        </ul>
        <div className="scoreBoard">
          <p>High Score: {this.state.highScore}</p>
          <p>Current Score: {this.state.tryCount}</p>
          <p>Successful Matches: {this.state.matchCount}</p>
        </div>
        <div
          className={
            this.state.win ? "modal winner visible" : "modal winner hidden"
          }
        >
          Congratulations
        </div>
      </div>
    );
  }
}

export default GameBoard;
