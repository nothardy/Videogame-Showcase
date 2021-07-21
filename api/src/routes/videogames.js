const express = require("express");
const router = express.Router();
const { getDbGames } = require("../functions/filters");
const {
  getFewGames,
  postGameIntoDb,
  getGameById,
  getAllGames,
} = require("../functions/controllers");

// ROUTE /videogames
router.route("/").get(getAllGames).post(postGameIntoDb);

// ROUTE /videogames/searchById/:gameId
router.route("/searchById/:gameId").get(getGameById);

// ROUTE /getFewGames
router.route("/getFewGames").get(getFewGames);

// ROUTE /dbgames
router.route("/dbgames").get(getDbGames);

module.exports = router;
