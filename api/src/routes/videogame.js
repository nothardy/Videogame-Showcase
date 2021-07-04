const express = require("express");
const router = express.Router();
const { Game, Genre } = require("../models");
const { specificGameDetails } = require("../models/filters");
const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;

router.route("/").post(async (req, res) => {
  try {
    const {
      id,
      name,
      description,
      release_date,
      rating,
      background_img,
      platforms,
      genres,
    } = req.body;
    const game = await Game.create({
      id,
      name,
      description,
      release_date,
      rating,
      background_img,
      platforms,
    });
    // if (Array.isArray(genres)) {
    //   genresResult = await Promise.all(
    //     genres.map((value) => Genre.findByPk(value))
    //   );
    // } else {
    //   genresResult = await Promise.all([Genre.findByPk(parseInt(genres))]);
    // }
    // await Game.setGenres(genresResult);
    res.json(game);
  } catch (error) {
    res.status(400).json(error || { error: "Please enter valid parameters" });
  }
});

router.route("/:gameId").get(async (req, res, next) => {
  const gameId = req.params.gameId;
  if (gameId.includes("H")) {
    Game.findByPk(gameId)
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
});

module.exports = router;
