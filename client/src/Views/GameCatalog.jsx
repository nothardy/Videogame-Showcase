import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGames } from "../Redux/actions";

export function GameCatalog() {
  const games = useSelector((state) => state.games);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getGames);
  }, [dispatch]);

  return (
    <>
      <h3>Games</h3>
      <ul>
        {games.map((game) => (
          <React.Fragment key={game.page}>
            <a href={"#"}>
              <h3>{game.name}</h3>
            </a>
          </React.Fragment>
        ))}
      </ul>
    </>
  );
}

export default GameCatalog;
