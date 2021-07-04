const express = require("express");
const router = express.Router();
const { Game, Genre } = require("../models");
require("dotenv").config();
const { API_KEY } = process.env;
const axios = require("axios");

router.route("/").get(async (req, res, next) => {
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
      let dbGames = await Game.findAll();

      apiGames = apiGames.data.results.map((game) => {
        return (game = {
          id: game.id,
          name: game.name,
          release_date: game.released,
          rating: game.rating,
          backgroundImg: game.background_image,
          platforms: game.parent_platforms.map((platform) => {
            return platform.platform.name;
          }),
        });
      });
      apiGames.length = 15;
      const games = apiGames.concat(dbGames);

      res.json(games);
    } catch (error) {
      next(error);
    }
  } else {
    try {
      let apiGames = await axios.get(
        `https://api.rawg.io/api/games?key=${API_KEY}`
      );
      let dbGames = await Game.findAll();

      apiGames = apiGames.data.results.map((game) => {
        return (game = {
          id: game.id,
          name: game.name,
          release_date: game.released,
          rating: game.rating,
          backgroundImg: game.background_image,
          platforms: game.parent_platforms.map((platform) => {
            return platform.platform.name;
          }),
        });
      });
      apiGames.length = 15;
      const games = apiGames.concat(dbGames);

      res.json(games);
    } catch (error) {
      next(error);
    }
  }
});
// YA CONSEGUI LA INFO, AHORA FALTA ORDENARLA/FILTRARLA Y HACER LAS DEMAS RUTAS
module.exports = router;
