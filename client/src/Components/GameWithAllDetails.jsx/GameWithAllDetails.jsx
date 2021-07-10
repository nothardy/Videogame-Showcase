import React from "react";
import parser from "html-react-parser";
import styles from "./GameWithAllDetails.module.css";

function GameWithAllDetails(props) {
  const setInnerHtml = (description) => {
    let header = "Description: ";
    description = header.concat(description);
    return { __html: description };
  };

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
              <p>Rating:{props.game.rating}</p>
            </div>
            <div>
              <p>Platforms:{props.game.platforms}</p>
            </div>
            <div>
              <p>Platforms:{props.game.platforms}</p>
            </div>
            <div>
              <p>Release Date:{props.game.release_date}</p>
            </div>
            <div>
              <div
                dangerouslySetInnerHTML={setInnerHtml(props.game.description)}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default GameWithAllDetails;

/*
{(() => {
                  if (props.game.description) parser(props.game.description);
                })()} */
