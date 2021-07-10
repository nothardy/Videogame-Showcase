import { AZ, ZA } from "../Components/Filters/Filters";

export const alphabeticFilter = (gamesToFilter1, order) => {
  let gamesToFilter = gamesToFilter1;
  console.log("adentro del filter", gamesToFilter[0].name.toLowerCase());
  //   if (order === AZ) {
  //     let orderedGames = gamesToFilter.sort((game, nextGame) => {
  //       if (game.name.toLowerCase() > nextGame.name.toLowerCase() ) {
  //         return 1;
  //       } else if (game.name.toLowerCase() < nextGame.name.toLowerCase() ) {
  //         return -1;
  //       } else {
  //         return 0;
  //       }
  //     });
  //     return orderedGames;
  //   } else if (order === ZA) {
  //     let orderedGames = gamesToFilter.sort((game, nextGame) => {
  //       if (game.name.toLowerCase() > nextGame.name.toLowerCase()) {
  //         return -1;
  //       } else if (game.name.toLowerCase() < nextGame.name.toLowerCase()) {
  //         return 1;
  //       } else {
  //         return 0;
  //       }
  //     });
  //     return orderedGames;
  //   }
  if (order === AZ) {
    let orderedGames = gamesToFilter.sort((game, nextGame) =>
      game.name.toLowerCase() > nextGame.name.toLowerCase()
        ? 1
        : game.name.toLowerCase() < nextGame.name.toLowerCase()
        ? -1
        : 0
    );
    return orderedGames;
  } else if (order === ZA) {
    let orderedGames = gamesToFilter.sort((game, nextGame) =>
      game.name.toLowerCase() > nextGame.name.toLowerCase()
        ? -1
        : game.name.toLowerCase() < nextGame.name.toLowerCase()
        ? 1
        : 0
    );
    return orderedGames;
  }
};
