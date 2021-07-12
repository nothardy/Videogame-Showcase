import { HIGHEST, LOWEST } from "../Components/Filters/Filters";

export const ratingFilter = (gamesToFilter, order) => {
  if (order === LOWEST) {
    let orderedGames = gamesToFilter.sort((game, nextGame) => {
      if (game.rating > nextGame.rating) {
        return 1;
      } else if (game.rating < nextGame.rating) {
        return -1;
      } else {
        return 0;
      }
    });
    return orderedGames;
  } else if (order === HIGHEST) {
    let orderedGames = gamesToFilter.sort((game, nextGame) => {
      if (game.rating > nextGame.rating) {
        return -1;
      } else if (game.rating < nextGame.rating) {
        return 1;
      } else {
        return 0;
      }
    });
    return orderedGames;
  }
};
