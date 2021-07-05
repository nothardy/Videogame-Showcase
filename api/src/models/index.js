var Sequelize = require("sequelize");
require("dotenv").config();
const { DB_USER, DB_PASS, DB_HOST, DB_PORT, DB_NAME } = process.env;
var db = new Sequelize(
  `postgres://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`
);
const { UUID, STRING, ARRAY, INTEGER, DATEONLY, TEXT } = Sequelize.DataTypes;

const Game = db.define("game", {
  id: { type: UUID, allowNull: false, primaryKey: true },
  name: { type: STRING, allowNull: false },
  description: { type: TEXT, allowNull: false },
  release_date: { type: STRING, allowNull: false }, // CAMBIAR DESPUES A DATEONLY
  background_img: { type: TEXT },
  rating: { type: INTEGER, allowNull: false },
  platforms: { type: ARRAY(TEXT), allowNull: false },
});

const Genre = db.define("genre", {
  id: {
    type: INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: { type: STRING, allowNull: false },
});

//Join Games with Genre
Game.belongsToMany(Genre, {
  through: "game_genre",
  as: "genres",
  foreignKey: "gameId",
});
Genre.belongsToMany(Game, {
  through: "game_genre",
  as: "game",
  foreignKey: "genreId",
});

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = { Game, Genre, db };
