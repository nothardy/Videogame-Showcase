const { Game, Genre, db } = require("../../src/models");
const { expect } = require("chai");
const { v4: uuidv4 } = require("uuid");
const { Op } = require("sequelize");

// describe("Videogame model", () => {
//   before(() =>
//     db.authenticate().catch((err) => {
//       console.error("Unable to connect to the database:", err);
//     })
//   );
//   describe("Validators", () => {
//     beforeEach(() => Game.sync({ force: true }));
//     describe("name", () => {
//       it("should throw an error if name is null", (done) => {
//         Game.create({})
//           .then(() => done(new Error("It requires a valid name")))
//           .catch(() => done());
//       });
//       it("should work when its a valid name", () => {
//         Game.create({ name: "Super Mario Bros" });
//       });
//     });
//   });
// });

const videogame = {
  name: "Testing the integrity of my life, I mean, my PI",
  id: uuidv4(),
  description: "If this doesnt work I might start taking pills... jk ",
  release_date: "16/01/1997",
  rating: Math.PI,
  platforms: ["Xbox", "PC"],
};

const genre = {
  name: "MMO",
};

describe("TEST ---> Game Db Model", () => {
  before(() =>
    db.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  describe("Validators", () => {
    beforeEach(() => Game.sync({ force: true }));
    describe("name", () => {
      it("should throw an error when name is null", (done) => {
        Game.create({})
          .then(() => done(new Error("Name cant be null")))
          .catch(() => done());
      });
      it("should work when its a valid name", () => {
        Game.create({ name: "PI Videogame" });
      });
    });
    describe("description", () => {
      it("should throw an error when description is null", (done) => {
        Game.create({})
          .then(() => done(new Error("Description cant be null")))
          .catch(() => done());
      });
      it("should work when its a valid description", () => {
        Game.create({
          description:
            "This description validates the great work i put through",
        });
      });
    });
    describe("platforms", () => {
      it("should throw an error when platforms are null", (done) => {
        Game.create({})
          .then(() => done(new Error("Platforms cant be null")))
          .catch(() => done());
      });
      it("should work when platforms arent null", () => {
        Game.create({ platform: "PC" });
      });
    });

    describe("Game Creation", () => {
      it("Should create a column in Games table properly", async () => {
        await Game.create(videogame);

        game = await Game.findAll({
          where: {
            name: { [Op.iLike]: `%${videogame.name}%` },
          },
        });
        expect(game).to.have.length(1);
        expect(game[0].dataValues.name).to.be.deep.equal(videogame.name);
        expect(game[0].dataValues.description).to.be.deep.equal(
          videogame.description
        );
      });
    });
  });

  //My test:
  describe("Genre Db Model", () => {
    beforeEach(() => Genre.sync({ force: true }));
    describe("Validation", () => {
      it("should throw an error when name is null", (done) => {
        Genre.create({})
          .then(() => done(new Error("Name cant be null")))
          .catch(() => done());
      });
      it("should create a column in Genre table properly", () => {
        Genre.create(genre);
      });
    });
  });
});
