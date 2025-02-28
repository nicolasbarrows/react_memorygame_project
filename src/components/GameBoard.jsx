import { Component } from "react";

class GameBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allCards: [],
    };

    this.createBoard = this.createBoard.bind(this);
    this.shuffleBoard = this.shuffleBoard.bind(this);
  }

  createBoard(cardNumber) {
    //takes in cardNumber : the total number of total cards to be displayed
    const matches = cardNumber / 2; //number of possible matches

    //create an array assigning a number value of each card
    const matchesArr = Array.from({ length: matches }, (_, i) => i);
    const cardArr = matchesArr.concat(matchesArr);

    return cardArr;
  }

  shuffleBoard(array) {
    const shuffled = array.slice();
    //takes in an array and returns a new array with the same values in a random order
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
  }

  componentDidMount() {
    const board = this.createBoard(16);
    const shuffled = this.shuffleBoard(board);
    this.setState({ allCards: shuffled }, () => {
      console.log(this.state.allCards);
    });
  }

  render() {
    return (
      //render values of allCards to the DOM as a list
      <div className="gameBoard">
        <ul className="gameBoard">
          {this.state.allCards.map((name, idx) => (
            <li class="card" key={idx}>
              {name}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default GameBoard;
