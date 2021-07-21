import React from "react";
import { configure, mount, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { MemoryRouter, BrowserRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import App from "./App";
import Home from "./Views/Home/Home";
import Nav from "./Components/Nav/Nav";
import reducer from "./Redux/reducer";
import {
  alphabeticFilter,
  filterByGenre,
  rankingFilter,
} from "./Redux/actions";

configure({ adapter: new Adapter() });

describe("App", () => {
  let store;
  const middlewares = [];
  const mockStore = configureStore(middlewares);

  beforeEach(() => {
    store = mockStore([]);
  });

  describe("El componente Nav debe renderizar en todas las rutas.", () => {
    it('Debería renderizarse en la ruta "/"', () => {
      const wrapper = mount(
        <>
          <Provider store={store}>
            <MemoryRouter initialEntries={["/"]}>
              <App />
            </MemoryRouter>
          </Provider>
        </>
      );
      expect(wrapper.find(Nav)).toHaveLength(1);
    });
    it("Debería renderizarse en cualquier otra ruta ", () => {
      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/about"]}>
            <App />
          </MemoryRouter>
        </Provider>
      );
      expect(wrapper.find(Nav)).toHaveLength(1);
    });
  });

  it('El componente Home debe renderizar en la ruta / (Sólo en la ruta "/")', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/"]}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    const extrawrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/about"]}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(wrapper.find(Home)).toHaveLength(1);
    expect(wrapper.find(Nav)).toHaveLength(1);
    expect(extrawrapper.find(Home)).toHaveLength(0);
    expect(extrawrapper.find(Nav)).toHaveLength(1);
  });

  describe("Reducer Filters", () => {
    it("Alphabetic Filter should sort correctly", () => {
      let initialState = {
        fewGames: [],
        games: [],
        gamesByName: [],
        genres: [],
        gameDetails: {},
        gamesFiltered: [],
        lastFilter: [],
      };
      initialState.games = [
        { id: 2, name: "Witcher 3", genre: "RPG", rating: 5 },
        { id: 3, name: "Ace Combat", genre: "Simulation", rating: 3 },
        { id: 5, name: "Age of Empires", genre: "Strategy", rating: 5 },
        { id: 7, name: "Metro", genre: "Terror", rating: 3 },
      ];
      expect(
        reducer(initialState, alphabeticFilter("A-Z")).gamesFiltered
      ).toEqual([
        { id: 3, name: "Ace Combat", genre: "Simulation", rating: 3 },
        { id: 5, name: "Age of Empires", genre: "Strategy", rating: 5 },
        { id: 7, name: "Metro", genre: "Terror", rating: 3 },
        { id: 2, name: "Witcher 3", genre: "RPG", rating: 5 },
      ]);
      expect(
        reducer(initialState, alphabeticFilter("Z-A")).gamesFiltered
      ).toEqual([
        { id: 2, name: "Witcher 3", genre: "RPG", rating: 5 },
        { id: 7, name: "Metro", genre: "Terror", rating: 3 },
        { id: 5, name: "Age of Empires", genre: "Strategy", rating: 5 },
        { id: 3, name: "Ace Combat", genre: "Simulation", rating: 3 },
      ]);
    });
    it("Rating Filter should sort correctly", () => {
      let initialState = {
        fewGames: [],
        games: [],
        gamesByName: [],
        genres: [],
        gameDetails: {},
        gamesFiltered: [],
        lastFilter: [],
      };
      initialState.games = [
        { id: 2, name: "Witcher 3", genre: "RPG", rating: 5 },
        { id: 3, name: "Ace Combat", genre: "Simulation", rating: 3.2 },
        { id: 5, name: "Age of Empires", genre: "Strategy", rating: 4 },
        { id: 7, name: "Metro", genre: "Terror", rating: 1.5 },
      ];
      expect(
        reducer(initialState, rankingFilter("From Highest Rating"))
          .gamesFiltered
      ).toEqual([
        { id: 2, name: "Witcher 3", genre: "RPG", rating: 5 },
        { id: 5, name: "Age of Empires", genre: "Strategy", rating: 4 },
        { id: 3, name: "Ace Combat", genre: "Simulation", rating: 3.2 },
        { id: 7, name: "Metro", genre: "Terror", rating: 1.5 },
      ]);
      expect(
        reducer(initialState, rankingFilter("From Lowest Rating")).gamesFiltered
      ).toEqual([
        { id: 7, name: "Metro", genre: "Terror", rating: 1.5 },
        { id: 3, name: "Ace Combat", genre: "Simulation", rating: 3.2 },
        { id: 5, name: "Age of Empires", genre: "Strategy", rating: 4 },
        { id: 2, name: "Witcher 3", genre: "RPG", rating: 5 },
      ]);
    });
  });

  describe("Genre Filters", () => {
    it("Genre Filter should sort correctly", () => {
      let initialState = {
        fewGames: [],
        games: [],
        gamesByName: [],
        genres: [],
        gameDetails: {},
        gamesFiltered: [],
        lastFilter: [],
      };
      initialState.games = [
        { id: 2, name: "Witcher 3", genres: ["Action", "RPG"], rating: 5 },
        {
          id: 3,
          name: "Ace Combat",
          genres: ["Combat", "Simulation"],
          rating: 3,
        },
        {
          id: 5,
          name: "Age of Empires",
          genres: ["Action", "Strategy"],
          rating: 5,
        },
        { id: 7, name: "Metro", genres: ["RPG", "Shooter"], rating: 3 },
      ];
      expect(
        reducer(initialState, filterByGenre(["RPG"])).gamesFiltered
      ).toEqual([
        { id: 2, name: "Witcher 3", genres: ["Action", "RPG"], rating: 5 },
        { id: 7, name: "Metro", genres: ["RPG", "Shooter"], rating: 3 },
      ]);
    });
  });
});
