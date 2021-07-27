const { default: axios } = require("axios");
const { Game, Genre } = require("../models/index");
const { Op } = require("sequelize");
require("dotenv").config();
const { API_KEY } = process.env;

const filterGameDetails = (fetchedGames) => {
  return (fetchedGames = fetchedGames.map((game) => {
    return (game = {
      id: game.id,
      name: game.name,
      release_date: game.released,
      rating: game.rating,
      background_img: game.background_image,
      genres:
        typeof game.id === "number"
          ? game.genres.map((genre) => {
              return genre.name;
            })
          : null,

      platforms:
        typeof game.id === "number"
          ? game.parent_platforms
            ? game.parent_platforms.map((platform) => {
                return platform.platform.name;
              })
            : null
          : null,
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

const getDbGames = async (gameName) => {
  if (gameName) {
    const dbGames = await Game.findAll({
      where: {
        name: { [Op.iLike]: `%${gameName}%` },
      },
      include: [
        {
          model: Genre,
          as: "genres",
          attributes: ["id", "name"],
          through: {
            attributes: [],
          },
        },
      ],
    });
    if (dbGames.length > 0) return dbGames;
  } else {
    const dbGames = await Game.findAll({
      include: [
        {
          model: Genre,
          as: "genres",
          attributes: ["id", "name"],
          through: {
            attributes: [],
          },
        },
      ],
    });
    if (dbGames.length > 0) return dbGames;
  }
};

const get100Games = async (api, manyGames = false) => {
  const dataPage1 = api.data;
  let allGames = dataPage1.results;
  let pages = dataPage1;
  let i = 0;
  // fetcheo cada pagina de resultados, hago hasta 6 (( 100 juegos)) pero podrian ser infinitos.
  while (i < 6 && !pages.next.endsWith(6) && manyGames == false) {
    // && !pages.next.endsWith(6)
    let getMoreFromApi = await axios.get(pages.next);

    allGames = [...allGames, ...getMoreFromApi.data.results];

    pages = getMoreFromApi.data;
    i++;
  }

  allGames = filterGameDetails(allGames);
  return allGames;

  // let newPages = [1, 2, 3, 4, 5];
  // let promises = newPages.map((page) => {
  //   return axios.get(
  //     `https://api.rawg.io/api/games?key=${API_KEY}&page=${page}`
  //   );
  // });

  // let resolvedPromises = await Promise.all(promises);
  // let allGames = [];

  // resolvedPromises = resolvedPromises
  //   .map((promisePage) => filterGameDetails(promisePage.data.results))
  //   .forEach(
  //     (resolvedPromise) => (allGames = [...allGames, ...resolvedPromise])
  //   );

  // return allGames;
};

module.exports = {
  get100Games,
  filterGameDetails,
  filterGenres,
  specificGameDetails,
  getDbGames,
};

// const get100Games = async (api, manyGames = false) => {
//   const dataPage1 = api.data;
//   let allGames = dataPage1.results;
//   let pages = dataPage1;
//   let i = 0;
//   // fetcheo cada pagina de resultados, hago hasta 6 (( 100 juegos)) pero podrian ser infinitos.
//   while (i < 6 && !pages.next.endsWith(6) && manyGames == false) {
//     // && !pages.next.endsWith(6)
//     let getMoreFromApi = await axios.get(pages.next);

//     allGames = [...allGames, ...getMoreFromApi.data.results];

//     pages = getMoreFromApi.data;
//     i++;
//   }

//   allGames = filterGameDetails(allGames);
//   return allGames;
// };
