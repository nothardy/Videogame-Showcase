import React from "react";
import "./Game.css";

function Game(props) {
  return (
    <>
      <div className="game-container">
        <div className="game-row">
          <div>
            {props.game.background_img &&
            (props.game.background_img.includes(".jpg") ||
              props.game.background_img.includes(".png")) ? (
              <img
                className="game-img"
                src={props.game.background_img}
                alt="image Missing"
              />
            ) : (
              <img
                className="game-img"
                src={"https://assets.soyhenry.com/logoOG.png"}
                alt="Image Missing"
              />
            )}
          </div>
          <div className="game-info">
            <div className="game-title">
              <p>{props.game.name}</p>
            </div>
            <div>
              <p className="genres">
                {typeof props.game.id !== "number" && props.game.genres
                  ? props.game.genres.map((genre) => genre.name).join(", ")
                  : props.game.genres && props.game.genres.length > 0
                  ? props.game.genres.join(", ")
                  : null}
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
