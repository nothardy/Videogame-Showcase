const express = require("express");
const router = express.Router();
const { getGenres } = require("../functions/controllers");

router.route("/").get(getGenres);

module.exports = router;
