import { AZ, ZA } from "../Components/Filters/Filters";

export const alphabeticFilter = (gamesToFilter, order) => {
  if (order === AZ) {
    let orderedGames = gamesToFilter.sort((game, nextGame) => {
      if (game.name.toLowerCase() > nextGame.name.toLowerCase()) {
        return 1;
      } else if (game.name.toLowerCase() < nextGame.name.toLowerCase()) {
        return -1;
      } else {
        return 0;
      }
    });
    return orderedGames;
  } else if (order === ZA) {
    let orderedGames = gamesToFilter.sort((game, nextGame) => {
      if (game.name.toLowerCase() > nextGame.name.toLowerCase()) {
        return -1;
      } else if (game.name.toLowerCase() < nextGame.name.toLowerCase()) {
        return 1;
      } else {
        return 0;
      }
    });
    return orderedGames;
  }
};
