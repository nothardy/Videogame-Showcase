const express = require("express");
const router = express.Router();
const {
  getApiGames,
  getGameByName,
  postGameIntoDb,
  getGameById,
  getAllGames,
} = require("../functions/controllers");
const { getDbGames } = require("../functions/filters");

router.route("/").get(getGameByName).post(postGameIntoDb);

router.route("/searchId/:gameId").get(getGameById);

// if query exists, brings first results matching query name
router.route("/apigames").get(getAllGames);

router.route("/dbgames").get(getDbGames);

module.exports = router;
