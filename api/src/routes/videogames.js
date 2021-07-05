const express = require("express");
const router = express.Router();
const {
  getApiGames,
  getDbGames,
  getGameByName,
  postGameIntoDb,
  getGameById,
} = require("../functions/controllers");

router.route("/").get(getGameByName).post(postGameIntoDb);

router.route("/searchId/:gameId").get(getGameById);

router.route("/apigames").get(getApiGames); // if query exists, brings first results matching query name

router.route("/dbgames").get(getDbGames);

module.exports = router;
