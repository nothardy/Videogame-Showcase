const express = require("express");
const router = express.Router();
const {
  getFewGames,
  getGameByName,
  postGameIntoDb,
  getGameById,
  getAllGames,
} = require("../functions/controllers");
const { getDbGames } = require("../functions/filters");

router.route("/").get(getAllGames).post(postGameIntoDb);

router.route("/searchById/:gameId").get(getGameById);

router.route("/getFewGames").get(getFewGames);

// if query exists, brings first results matching query name

router.route("/dbgames").get(getDbGames);

module.exports = router;
