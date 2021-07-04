var Sequelize = require("sequelize");
require("dotenv").config();
const { DB_USER, DB_PASS, DB_HOST, DB_PORT, DB_NAME } = process.env;
var db = new Sequelize(
  `postgres://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`
);
const { STRING, VIRTUAL, TEXT } = Sequelize.DataTypes;

const Game = db.define("game", {
  id: { type: STRING, allowNull: false, primaryKey: true },
  name: { type: STRING, allowNull: false },
  description: { type: TEXT, allowNull: false },
  release_date: { type: STRING, allowNull: false },
  rating: { type: STRING, allowNull: false },
  platform: { type: STRING, allowNull: false },
});

const Genre = db.define("genre", {
  id: { type: STRING, allowNull: false, primaryKey: true },
  name: { type: STRING, allowNull: false },
});

//Join Games with Genre
Game.belongsToMany(Genre, { through: "game_genre" });
Genre.belongsToMany(Game, { through: "game_genre" });

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = { Game, Genre, db };
