import { alphabeticFilter } from "../FilterFunctions/alphabeticFilter";
import { genreFilter } from "../FilterFunctions/genreFilter";
import { ratingFilter } from "../FilterFunctions/rankingFilter";
import {
  ALPHABET_FILTER,
  FILTER_BY_GENRE,
  GET_GAMES,
  GET_GAME_DETAILS,
  GET_GENRES,
  NO_FILTER,
  POST_GAME,
  RANKING_FILTER,
  REMOVE_SEARCHED_GAMES_BY_NAME,
  SEARCH_GAME_BY_NAME,
} from "./actions";

let initialState = {
  games: [],
  gamesByName: [],
  genres: [],
  gameDetails: {},
  gamesFiltered: [],
};

const gamesToFilterDeclaration = (state = initialState) => {
  let gamesToFilter = [];
  state.gamesByName.length > 0
    ? (gamesToFilter = state.gamesByName.map((game) => game))
    : state.gamesFiltered.length > 0
    ? (gamesToFilter = state.gamesFiltered.map((game) => game))
    : (gamesToFilter = state.games.map((game) => game));
  return gamesToFilter;
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_GAMES:
      return {
        ...state,
        games: action.payload,
      };
    case POST_GAME:
      return {
        ...state,
        games: [...state.games, action.payload],
      };
    case SEARCH_GAME_BY_NAME:
      return {
        ...state,
        gamesByName: action.payload,
      };
    case GET_GENRES:
      return {
        ...state,
        genres: action.payload,
      };

    case GET_GAME_DETAILS:
      return {
        ...state,
        gameDetails: action.payload,
      };

    case REMOVE_SEARCHED_GAMES_BY_NAME:
      return {
        ...state,
        gamesByName: [],
      };

    case ALPHABET_FILTER: {
      let gamesToFilter = gamesToFilterDeclaration(state);
      return {
        ...state,
        gamesFiltered: alphabeticFilter(gamesToFilter, action.payload),
      };
    }

    case RANKING_FILTER: {
      let gamesToFilter = gamesToFilterDeclaration(state);
      return {
        ...state,
        gamesFiltered: ratingFilter(gamesToFilter, action.payload),
      };
    }

    case FILTER_BY_GENRE: {
      let gamesToFilter = gamesToFilterDeclaration(state);
      return {
        ...state,
        gamesFiltered: genreFilter(gamesToFilter, action.payload),
      };
    }

    case NO_FILTER:
      return {
        ...state,
        gamesFiltered: [],
      };

    default:
      return state;
  }
};

export default reducer;
