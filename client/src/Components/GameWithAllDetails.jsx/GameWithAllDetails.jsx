import React, { useState } from "react";
import styles from "./GameWithAllDetails.module.css";

function GameWithAllDetails(props) {
  const [readMore, setReadMore] = useState(false);
  let header = "Description: ";

  const setInnerHtml = (description) => {
    if (readMore === false) {
      description = header.concat(description).slice(0, 60);
    } else {
      description = header.concat(description);
      return { __html: description };
    }
  };

  const linkName = readMore ? "Hide Description <<" : "See Description >>";

  const handleOnClick = () => {
    setReadMore(!readMore);
  };

  return (
    <>
      <div className={`${styles.row}`}>
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
                <p>
                  Name:
                  <br />
                  {props.game.name}
                </p>
              </div>
              <div>
                <p>
                  Genres:
                  <br />
                  {props.game.genres && props.game.genres.join(", ")}
                </p>
              </div>
              <div>
                <p>
                  Rating:
                  <br />
                  {props.game.rating}
                </p>
              </div>
              <div>
                <p>
                  Platforms: <br />
                  {props.game.platforms && props.game.platforms.join(", ")}
                </p>
              </div>
              <div>
                <p>
                  Release Date:
                  <br />
                  {props.game.release_date}
                </p>
              </div>
              <div>
                <a className="read-more-link" onClick={handleOnClick}>
                  <p>{linkName}</p>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className={`${styles.gameContainer}`}>
          <div
            dangerouslySetInnerHTML={setInnerHtml(props.game.description)}
          ></div>
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
