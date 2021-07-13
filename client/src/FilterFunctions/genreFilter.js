export const genreFilter = (gamesToFilter, genresToFilter, lastFilter) => {
  if (genresToFilter.length <= 0) return lastFilter;
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
  if (!(filteredGames.length > 0))
    filteredGames.push({ name: "No Matches Found" });
  return filteredGames;
};
