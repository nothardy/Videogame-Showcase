/* eslint-disable */
export const genreFilter = (gamesToFilter, genresToFilter, lastFilter) => {
  //   if (genresToFilter.length <= 0) return lastFilter;
  //   let filteredGames = gamesToFilter.map((game) => {
  //     if (game.genres) {
  //       for (let genre of game.genres) {
  //         for (let genreToFilter of genresToFilter) {
  //           if (game.fromDb && genreToFilter == "From Db") return game;
  //           else if (genre === genreToFilter) return game;
  //           else if (genre.name === genreToFilter) return game;
  //         }
  //       }
  //     }
  //   });
  //   filteredGames = filteredGames.filter((game) => game !== undefined);
  //   if (!(filteredGames.length > 0))
  //     filteredGames.push({ error: "No Matches Found" });
  //   return filteredGames;

  if (genresToFilter.length <= 0) return lastFilter;
  let filteredGames = gamesToFilter.filter((game) => {
    if (game.fromDb && genresToFilter.includes("From Db")) return game;
    else if (game.genres && game.fromDb) {
      let genresInsideDbGame = game.genres.map((genre) => genre.name);
      return genresInsideDbGame.includes(...genresToFilter);
    } else if (game.genres) return game.genres.includes(...genresToFilter);
  });
  filteredGames = filteredGames.filter((game) => game !== undefined);
  if (!(filteredGames.length > 0))
    filteredGames.push({ error: "No Matches Found" });
  return filteredGames;
};
