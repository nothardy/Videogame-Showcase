const express = require("express");
const router = express.Router();
const {
  postGameIntoDb,
  getSpecificGame,
  getGameById,
} = require("../functions/controllers");

router.route("/").post(postGameIntoDb);

router.route("/:gameId").get(getGameById);

module.exports = router;
