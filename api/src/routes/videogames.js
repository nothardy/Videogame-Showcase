const express = require("express");
const router = express.Router();
const { Game, Genre } = require("../models");
require("dotenv").config();
const { API_KEY } = process.env;
const axios = require("axios");
const { filterGameDetails } = require("../models/filters");

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
      apiGames = filterGameDetails(apiGames);
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
      apiGames = filterGameDetails(apiGames);
      apiGames.length = 15;
      const games = apiGames.concat(dbGames);
      res.json(games);
    } catch (error) {
      next(error);
    }
  }
});
module.exports = router;
