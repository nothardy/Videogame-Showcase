import React, { useState } from "react";
import "./GameWithAllDetails.css";

function GameWithAllDetails(props) {
  const [readMore, setReadMore] = useState(false);

  const setInnerHtml = (description) => {
    if (readMore === true) {
      return { __html: description };
    }
  };

  const linkName = readMore ? "<< Hide Description " : "<< See Description ";

  const handleOnClick = () => {
    setReadMore(!readMore);
  };

  return (
    <>
      <div className="details-row">
        <div className="details-game-container">
          <div className="details-row">
            <div>
              {props.game.background_img &&
              (props.game.background_img.includes(".jpg") ||
                props.game.background_img.includes(".png")) ? (
                <img
                  className="details-game-img"
                  src={props.game.background_img}
                  alt="Missing"
                />
              ) : (
                <img
                  className="details-game-img"
                  src={"https://assets.soyhenry.com/logoOG.png"}
                  alt="Missing"
                />
              )}
            </div>
            <div className="details-game-description">
              <div
                className="info-titles"
                dangerouslySetInnerHTML={setInnerHtml("Description")}
              ></div>
              <div
                dangerouslySetInnerHTML={setInnerHtml(props.game.description)}
              ></div>
            </div>
            <div className="details-game-info">
              <div>
                <p className="info-titles">Name:</p>
                <p className="info-data">
                  <br />
                  {props.game.name}
                </p>
              </div>
              <div>
                <p className="info-titles">Genres:</p>
                <p className="info-data">
                  <br />
                  {typeof props.game.id !== "number" && props.game.genres
                    ? props.game.genres.map((genre) => genre.name).join(", ")
                    : props.game.genres && props.game.genres.length > 0
                    ? props.game.genres.join(", ")
                    : null}
                </p>
              </div>
              <div>
                <p className="info-titles">Rating:</p>
                <p className="info-data">
                  <br />
                  {props.game.rating}
                </p>
              </div>
              <div>
                <p className="info-titles">Platforms:</p>
                <p className="info-data">
                  <br />
                  {props.game.platforms && props.game.platforms.join(", ")}
                </p>
              </div>
              <div>
                <p className="info-titles">Release Date:</p>
                <p className="info-data">
                  <br />
                  {props.game.release_date}
                </p>
              </div>
              <div>
                <button
                  className="details-read-more-link"
                  onClick={handleOnClick}
                >
                  <p>{linkName}</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default GameWithAllDetails;
