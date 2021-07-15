import React from "react";
import { useSelector } from "react-redux";
import styles from "./Game.module.css";
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
            <div>
              <p>Name:{props.game.name}</p>
            </div>
            <div>
              <p>Genres:{props.game.genres}</p>
            </div>
            <div>
              <p>Rating:{props.game.rating}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Game;
