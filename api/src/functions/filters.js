const filterGameDetails = (fetchedApiObject) => {
  return (fetchedApiObject = fetchedApiObject.data.results.map((game) => {
    return (game = {
      id: game.id,
      name: game.name,
      release_date: game.released,
      rating: game.rating,
      background_img: game.background_image,
      genres: game.genres.map((genre) => {
        return {
          id: genre.id,
          name: genre.name,
        };
      }),
      platforms: game.parent_platforms.map((platform) => {
        return platform.platform.name;
      }),
    });
  }));
};

const specificGameDetails = (game) => {
  game = game.data;
  return (game = {
    id: game.id,
    name: game.name,
    description: game.description,
    release_date: game.released,
    rating: game.rating,
    background_img: game.background_image,
    genres: game.genres.map((genre) => {
      return genre.name;
    }),
    platforms: game.parent_platforms.map((platform) => {
      return platform.platform.name;
    }),
  });
};

const filterGenres = (fetchedApiObject) => {
  return fetchedApiObject.data.results.map((genre) => {
    return (genre = {
      id: genre.id,
      name: genre.name,
    });
  });
};

module.exports = {
  filterGameDetails,
  filterGenres,
  specificGameDetails,
};
