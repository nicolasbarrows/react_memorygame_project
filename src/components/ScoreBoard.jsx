import React from "react";

const ScoreBoard = ({ highScore, tryCount, matchCount }) => {
  return (
    <div className="scoreBoard">
      <p>
        High Score{" "}
        <span className="score">{highScore !== null ? highScore : "N/A"}</span>
      </p>
      <p>
        Current Score <span className="score">{tryCount}</span>
      </p>
      <p>
        Matches Found <span className="score">{matchCount}</span>
      </p>
    </div>
  );
};

export default ScoreBoard;
