import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGames } from "../Redux/actions";
import { Link } from "react-router-dom";

export function GameCatalog() {
  const games = useSelector((state) => state.games);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getGames);
  }, [dispatch]);

  return (
    <>
      <h3>Games</h3>
      <Link to="/postgame">
        <button className="postGame">Add your own Game!</button>
      </Link>
    </>
  );
}

export default GameCatalog;
