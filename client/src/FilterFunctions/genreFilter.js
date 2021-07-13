export const genreFilter = (gamesToFilter, genresToFilter) => {
  let filteredGames = gamesToFilter.map((game) => {
    if (!game.genres) {
      for (let genreToFilter of genresToFilter) {
        if (genreToFilter === "From Db") return game;
      }
    } else {
      for (let genre of game.genres) {
        for (let genreToFilter of genresToFilter) {
          if (genre === genreToFilter) return game;
        }
      }
    }
  });
  filteredGames = filteredGames.filter((game) => game !== undefined);
  return filteredGames;
};
