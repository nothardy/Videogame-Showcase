import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import GameWithAllDetails from "../../Components/GameWithAllDetails/GameWithAllDetails";
import { getGameDetails, removeGameDetails } from "../../Redux/actions";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import "./GameDetails.css";

function GameDetail() {
  let gameDetails = useSelector((state) => state.gameDetails);
  const dispatch = useDispatch();
  let { gameId } = useParams();
  const [fetchedDetails, setFetchedDetails] = useState(false);

  useEffect(() => {
    if (fetchedDetails === false) {
      async function dispatches() {
        await dispatch(getGameDetails(gameId));
      }
      dispatches();
      setFetchedDetails(true);
    }
  }, [gameId, dispatch, fetchedDetails]);

  const handleOnClick = (e) => {
    if (gameId !== gameDetails.id) {
      dispatch(removeGameDetails());
    }
  };

  return (
    <>
      <Link className="react-link" to="/catalog">
        <div className="back-to-showcase">
          <button>back To Showcase</button>
        </div>
      </Link>
      <GameWithAllDetails game={gameDetails} onClick={handleOnClick} />
    </>
  );
}

export default GameDetail;
