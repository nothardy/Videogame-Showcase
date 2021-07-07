import React from "react";
import { useSelector } from "react-redux";
import styles from "./Game.module.css";

function Game(props) {
  return (
    <>
      <div classname="gameContainer">
        <div className="row">
          <div className="gameImg">
            <img src={props.backgroun_img} />
          </div>
          <div className="gameInfo">
            <div>
              <p>{props.name}</p>
            </div>
            <div>
              <p>{props.genres}</p>
            </div>
            <div>
              <p>{props.platforms}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Game;
