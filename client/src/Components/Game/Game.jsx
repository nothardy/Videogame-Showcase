import React from "react";
import "./Game.css";

function Game(props) {
  return (
    <>
      <div className="game-container">
        <div className="game-row">
          <div>
            <img className="game-img" src={props.game.background_img} />
          </div>
          <div className="game-info">
            <div className="game-title">
              <p>{props.game.name}</p>
            </div>
            <div>
              <p className="platforms">
                {props.game.genres && props.game.genres.join(", ")}
              </p>
            </div>
            <div>
              <p className="rating">Rating {props.game.rating}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Game;
