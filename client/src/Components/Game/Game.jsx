import React from "react";
import { useSelector } from "react-redux";
import styles from "./Game.module.css";

function Game(props) {
  // let props.game = {
  //   name: "witcher",
  //   genres: ["action", "RPG"],
  //   platforms: ["PC", "xbox"],
  //   background_img: "https://picfiles.alphacoders.com/198/thumb-198636.jpg",
  // };

  return (
    <>
      <div className={`${styles.gameContainer}`}>
        <div className={`${styles.row}`}>
          <div>
            <img
              className={`${styles.gameImg}`}
              src={props.game.background_img}
            />
          </div>
          <div className={`${styles.gameInfo}`}>
            <div>
              <p>Name:{props.game.name}</p>
            </div>
            <div>
              <p>Genres:{props.game.genres}</p>
            </div>
            <div>
              <p>Platforms:{props.game.platforms}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Game;
