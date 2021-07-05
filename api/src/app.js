const express = require("express");
const cookieParser = require("cookie-parser");

const morgan = require("morgan");
const videogamesRoute = require("./routes/videogames");
//const videogameRoute = require("./routes/videogame");
const genresRoute = require("./routes/genres");
const cors = require("cors");

const server = express();

server.name = "API";

server.use(cors());
server.use(express.json());
server.use(cookieParser());
server.use(morgan("dev"));

//server.use("/videogame", videogameRoute);
server.use("/videogames", videogamesRoute);
server.use("/genres", genresRoute);

// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;

// server.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
//   res.header("Access-Control-Allow-Credentials", "true");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
//   next();
// });
