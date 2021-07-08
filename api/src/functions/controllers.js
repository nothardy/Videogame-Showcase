const { default: axios } = require("axios");
const {
  filterGameDetails,
  specificGameDetails,
  filterGenres,
  filterGameDetails2,
  get100Games,
  getDbGames,
} = require("./filters");
require("dotenv").config();
require("uuid");
const { API_KEY } = process.env;
const { Game, Genre } = require("../models");
const { v4: uuidv4 } = require("uuid");
const { Op } = require("sequelize");

//OTRA MANERA DE TRAERME ABSOLUTAMENTE TODOS LOS JUEGOS
const getAbsolutelyAllGames = async () => {
  let allGames = [];
  let showGames = [];
  const getApiGames = await axios.get(
    `https://api.rawg.io/api/games?key=${API_KEY}`
  );
  const dataPage1 = getApiGames.data;
  allGames = [...allGames, ...dataPage1.results];
  let pages = dataPage1;
  let i = 0;
  // fetcheo cada pagina de resultados, hago hasta 6 pero podrian ser infinitos.
  while (i < 6) {
    // && !pages.next.endsWith(6)
    let getMoreApiGames = await axios.get(pages.next);
    allGames = [...allGames, ...getMoreApiGames.data.results];
    pages = getMoreApiGames.data;
    i++;
  }
  allGames.forEach((game) => {
    const fetchedGame = {
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
    };
    showGames = [...showGames, fetchedGame];
  });
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
  const absolutelyAllGames = [...dbGames, ...showGames];
  return absolutelyAllGames;
};

const getDynamicResultPages = async (url = "url") => {
  try {
    let currentPage = await axios.get(url);

    //let dbGames = await Game.findAll();
    const nextPage = currentPage.next;
    let apiGames = filterGameDetails(currentPage);
    apiGames.length = 15;
    const games = apiGames;
    //.concat(dbGames);
    res.json(games, nextPage);
  } catch (error) {
    next(error);
  }
};

const getAllGames = async (req, res, next) => {
  if (req.url.includes("?name")) {
    const gameName = req.query.name;
    try {
      let apiGames = await axios.get(
        `https://api.rawg.io/api/games?key=${API_KEY}&search=${gameName}`
      );
      if (!apiGames.data.results[0])
        return res
          .status(400)
          .json({ error: "Game not found. Please enter a valid name" });
      let dbGames = await getDbGames(gameName);
      let allGames = await get100Games(apiGames, true);
      allGames = allGames.concat(dbGames);
      res.json(allGames);
    } catch (error) {
      next(error);
    }
  } else {
    try {
      let apiGames = await axios.get(
        `https://api.rawg.io/api/games?key=${API_KEY}`
      );
      let dbGames = await getDbGames();
      let allGames = await get100Games(apiGames);
      allGames = allGames.concat(dbGames);
      res.json(allGames);
    } catch (error) {
      next(error);
    }
  }
};

const getApiGamesDeprecated = async (req, res, next) => {
  if (req.url.includes("?name")) {
    const gameName = req.query.name;
    try {
      let apiGames = await axios.get(
        `https://api.rawg.io/api/games?key=${API_KEY}&search=${gameName}`
      );
      if (!apiGames.data.results[0])
        return res
          .status(400)
          .json({ error: "Game not found. Please enter a valid name" });
      //let dbGames = await Game.findAll();

      apiGames = filterGameDetails(apiGames);
      //apiGames.length = 15;
      const games = apiGames;
      //.concat(dbGames);
      res.json(games);
    } catch (error) {
      next(error);
    }
  } else {
    try {
      let apiGames = await axios.get(
        `https://api.rawg.io/api/games?key=${API_KEY}`
      );
      //let dbGames = await Game.findAll();
      apiGames = filterGameDetails(apiGames);
      //apiGames.length = 15;
      const games = apiGames;
      //.concat(dbGames);
      res.json(games);
    } catch (error) {
      next(error);
    }
  }
};

const postGameIntoDb = async (req, res, next) => {
  try {
    const {
      name,
      description,
      release_date,
      rating,
      background_img,
      platforms,
      genres,
    } = req.body;
    const game = await Game.create({
      id: uuidv4(),
      name,
      description,
      release_date,
      rating,
      background_img,
      platforms,
    });
    genres.forEach(async (genre) => {
      let genreThatMatchesDb = await Genre.findOne({
        where: {
          name: genre,
        },
      });
      game.addGenre(genreThatMatchesDb);
    });
    res.json({ msg: "Game Succesfully created" });
  } catch (error) {
    next(error);
    //res.status(400).json(error || { error: "Please enter valid parameters" });
  }
};
const getGameById = async (req, res, next) => {
  if (req.params.hasOwnProperty("gameId")) {
    const gameId = req.params.gameId;
    if (gameId.length > 9) {
      // los uuid son largos jeje
      Game.findByPk(gameId, {
        include: [{ model: Genre, as: "genres", attributes: ["id", "name"] }], // me traigo solo algunos atrib
      })
        .then((game) => (game ? res.json(game) : res.sendStatus(404)))
        .catch((error) => next(error));
    } else {
      try {
        let apiGame = await axios.get(
          `https://api.rawg.io/api/games/${gameId}?key=${API_KEY}`
        );
        if (apiGame.data.detail === "Not found.")
          return res
            .status(404)
            .json({ error: "Game not found. Please enter a valid name" });
        const gameDetails = specificGameDetails(apiGame);
        res.json(gameDetails);
      } catch (error) {
        return res
          .status(404)
          .json({ error: "Game not found. Please enter a valid name" });
      }
    }
  }
};

const getGameByName = async (req, res, next) => {
  if (req.url.includes("?name")) {
    const gameName = req.query.name;
    try {
      const dbGames = await Game.findAll({
        include: [
          {
            model: Genre,
            as: "genres",
            attributes: ["id", "name"],
          },
        ],
        where: { name: { [Op.iLike]: `%${gameName}%` } }, // op.ilike mimics LIKE sentence in SQL :D
      });
      let apiGames = await axios.get(
        `https://api.rawg.io/api/games?key=${API_KEY}&search=${gameName}`
      );
      if (!apiGames.data.results[0])
        return res
          .status(400)
          .json({ error: "Game not found. Please enter a valid name" });
      //let dbGames = await Game.findAll();
      apiGames = filterGameDetails(apiGames);
      let combinedGames = dbGames.concat(apiGames);
      combinedGames.length = 15;
      res.json(combinedGames);
      //const games = apiGames;
      //.concat(dbGames);
      //res.json(games);
    } catch (error) {
      next(error);
    }
  }
};

const getGenres = async (_req, res, next) => {
  let genreTable = await Genre.findAll();
  if (genreTable.length !== 19) {
    try {
      let apiGenres = await axios.get(
        `https://api.rawg.io/api/genres?key=${API_KEY}`
      );
      const genres = filterGenres(apiGenres);
      genres.forEach(async (genre) => {
        await Genre.findOrCreate({
          where: {
            name: genre.name,
          },
        });
      });
      return res.json({
        msg: "Genre table succesfully created. Genres were imported from API and from now on will be reached from db",
      });
    } catch (error) {
      next(error);
    }
  } else return res.json(genreTable);
};

module.exports = {
  getAbsolutelyAllGames,
  getAllGames,
  getGameByName,
  postGameIntoDb,
  getGameById,
  getGenres,
};
