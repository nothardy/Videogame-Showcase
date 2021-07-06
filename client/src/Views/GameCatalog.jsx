import React from "react";

function GameCatalog() {
  let games = [];
  return (
    <>
      <h3>Games</h3>
      <ul>
        {games.map((game) => {
          <React.Fragment key={game.page}>
            <a href={game.route}>
              <h3>{game.name}</h3>
            </a>
          </React.Fragment>;
        })}
      </ul>
    </>
  );
}

export default GameCatalog;
