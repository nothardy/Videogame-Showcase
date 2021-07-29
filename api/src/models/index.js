require("dotenv").config();
var Sequelize = require("sequelize");

const { DB_USER, DB_PASS, DB_HOST, DB_PORT, DB_NAME } = process.env;
// const db = new Sequelize(
//   `postgres://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
//   { logging: false, native: false }
// );
const { UUID, STRING, ARRAY, INTEGER, TEXT, BOOLEAN } = Sequelize.DataTypes;

let db =
  process.env.NODE_ENV === "production"
    ? new Sequelize({
        database: DB_NAME,
        dialect: "postgres",
        host: DB_HOST,
        port: 5432,
        username: DB_USER,
        password: DB_PASS,
        pool: {
          max: 3,
          min: 1,
          idle: 10000,
        },
        dialectOptions: {
          ssl: {
            require: true,
            // Ref.: https://github.com/brianc/node-postgres/issues/2009
            rejectUnauthorized: false,
          },
          keepAlive: true,
        },
        ssl: true,
      })
    : new Sequelize(
        `postgres://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
        { logging: false, native: false }
      );

const Game = db.define("game", {
  id: { type: UUID, allowNull: false, primaryKey: true },
  name: { type: STRING, allowNull: false },
  description: { type: TEXT, allowNull: false },
  release_date: { type: STRING, allowNull: false },
  background_img: { type: STRING },
  rating: { type: STRING, allowNull: false },
  platforms: { type: ARRAY(TEXT), allowNull: false },
  fromDb: { type: BOOLEAN },
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

module.exports = { Game, Genre, db };
