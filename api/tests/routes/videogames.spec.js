/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const { v4: uuidv4 } = require("uuid");
const session = require("supertest-session");
const app = require("../../src/app");
const { Game, Genre, db } = require("../../src/models");

const agent = session(app);
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

describe("Testing ---> Routes", () => {
  before(() =>
    db.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(() => {
    Game.sync({ force: true }).then(() => Game.create(videogame));
    Genre.sync({ force: true }).then(() => Genre.create(genre));
  });

  describe("GET /videogames", () => {
    it("should get 200", () => {
      Game.create(videogame);
      agent.get("/videogames").expect(200);
    });

    it("should get 200 and and contain 100 video games", () => {
      agent
        .get("/videogames")
        .expect(200)
        .expect("Content-Type", /json/)
        .expect((res) => {
          expect(res.body).toHaveLength(100);
        });
    });
  });

  // My Test:
  describe("GET /videogames?name", () => {
    it("should get 200 status and return first 15 games from API matching query name ", () => {
      agent
        .get("/videogames?name=Crysis")
        .expect(200)
        .expect("Content-Type", /json/)
        .expect((res) => {
          expect(res.body).toHaveLength(15);
        });
    });

    it("should get Error 404 when a game is not found", () => {
      agent
        .get("/videogames?name=zzzzzzzzzzzzzzzzzzz")
        .expect(404)
        .expect("Content-Type", /json/)
        .expect((res) => {
          expect(res.body).toEqual({
            message: "The requested game was not found on this server.",
          });
        });
    });
  });
  describe("POST /videogames", () => {
    it("Should add a game into Db and return it", () => {
      agent
        .post("/videogames")
        .send(videogame)
        .expect(200)
        .expect("Content-Type", /json/)
        .expect((res) => {
          expect(res.body).toEqual(videogame);
        });
    });
    it("Should return an error message if name is null", () => {
      agent
        .post("/videogame")
        .send({
          name: "",
          description: "Testing null name",
          relesead: "16/01/1997",
          rating: 1,
          platforms: "PC",
        })
        .expect(400)
        .expect("Content-Type", /json/)
        .expect((res) => {
          expect(res.body).toEqual({
            message: "Invalid game name.",
          });
        });
    });
    it("Should return an error message if description is null", () => {
      agent
        .post("/videogame")
        .send({
          name: "Testing null description",
          description: "",
          relesead: "16/01/1997",
          rating: 2,
          platforms: "PC",
        })
        .expect(400)
        .expect("Content-Type", /json/)
        .expect((res) => {
          expect(res.body).toEqual({
            message: "Invalid game description",
          });
        });
    });
    it("Should return an error message if platforms are null", () => {
      agent
        .post("/videogame")
        .send({
          name: "Testing null platform",
          description: "Testing null platform",
          relesead: "16/01/1997",
          rating: 3,
          platforms: "",
        })
        .expect(400)
        .expect("Content-Type", /json/)
        .expect((res) => {
          expect(res.body).toEqual({
            message: "Invalid game platforms",
          });
        });
    });
  });

  describe("GET /videogame/searchById/:id", () => {
    it("should get 200 and return a game that matches id in params ", () => {
      agent
        .get("/videogames/searchById/41494")
        .expect(200)
        .expect("Content-Type", /json/)
        .expect((res) => {
          expect(res.body.name).toEqual("Cyberpunk 2077");
        });
    });

    it("should get error 404 when ID doesnt match any game", () => {
      agent
        .get("/videogames/99999999999")
        .expect(404)
        .expect("Content-Type", /json/)
        .expect((res) => {
          expect(res.body).toEqual({
            message: "The requested game was not found on this server.",
          });
        });
    });
  });

  describe("GET /genres", () => {
    agent
      .get("/genres")
      .expect(200)
      .expect("Content-Type", /json/)
      .expect((res) => {
        expect(res.body).toHaveLength(1);
      });
  });
});
