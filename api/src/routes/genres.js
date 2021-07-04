const express = require("express");
const router = express.Router();
const { Game, Genre } = require("../models");
require("dotenv").config();
const { API_KEY } = process.env;
const axios = require("axios");
const { filterGameDetails, filterGenres } = require("../models/filters");

router.route("/").get(async (req, res, next) => {
  let genreTable = await Genre.findAll();
  if (genreTable.length == 0) {
    try {
      let apiGenres = await axios.get(
        `https://api.rawg.io/api/genres?key=${API_KEY}`
      );
      const genres = filterGenres(apiGenres);
      let genre = genres.forEach(async (genre) => {
        await Genre.create({
          id: genre.id,
          name: genre.name,
        });
      });
      return res.json({
        msg: "Genre table succesfully created. Genres were imported from API and from now on will be reached from db",
      });
    } catch (error) {
      next(error);
    }
  } else return res.json(genreTable);
});

//   const [genre, created] = await Genre.findOrCreate({
//     where: { id: "hola soy un id" },
//     defaults: { id: "hola soy un id", name: "hola soy un nombre" },
//   });
//   if (created === false) return res.json({ msg: "No encontre nada rey" });

module.exports = router;
