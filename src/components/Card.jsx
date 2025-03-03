import React from "react";

const Card = ({ flippedCardsArray, cardValue, cardIndex, onCardClick }) => {
  //load images to display on cards
  let cardImages = [
    require("../images/yellow-od1.png"),
    require("../images/blue-compressor.png"),
    require("../images/green-ph3.png"),
    require("../images/grey-eq7.png"),
    require("../images/orange-ds1.png"),
    require("../images/pink-pf-2.png"),
    require("../images/purple-bf2.png"),
    require("../images/blue-tremolo.png"),
    require("../images/white-dd8.png"),
    require("../images/yellow-ac3.png"),
    require("../images/black-mt2w.png"),
  ];

  let isFlipped = flippedCardsArray.includes(cardIndex);

  return (
    <li
      className={`card
                ${isFlipped ? "flipped" : ""}
                ${isFlipped ? "color" + cardValue : "gray"}`}
      id={cardIndex}
      onClick={() => {
        onCardClick(cardValue, cardIndex);
      }}
      key={cardIndex}
    >
      {/*Assign an image to the card*/}
      <img
        src={
          isFlipped
            ? cardImages[cardValue]
            : require("../images/BOSS_logo.svg.png")
        }
        alt={`Guitar Pedal ${cardValue}`}
      />
    </li>
  );
};

export default Card;
