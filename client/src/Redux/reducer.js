import { alphabeticFilter } from "../FilterFunctions/alphabeticFilter";
import { genreFilter } from "../FilterFunctions/genreFilter";
import { ratingFilter } from "../FilterFunctions/rankingFilter";
import {
  ALPHABET_FILTER,
  FILTER_BY_GENRE,
  GET_FEW_GAMES,
  GET_GAMES,
  GET_GAME_DETAILS,
  GET_GENRES,
  NO_FILTER,
  POST_GAME,
  RANKING_FILTER,
  REMOVE_GAME_DETAILS,
  REMOVE_SEARCHED_GAMES_BY_NAME,
  SEARCH_GAME_BY_NAME,
} from "./actions";

let initialState = {
  fewGames: [],
  games: [],
  gamesByName: [],
  genres: [],
  gameDetails: {},
  gamesFiltered: [],
  lastFilter: [],
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
    case GET_FEW_GAMES:
      return {
        ...state,
        fewGames: action.payload,
      };
    case POST_GAME:
      return {
        ...state,
        games: [...state.games, action.payload],
      };
    case SEARCH_GAME_BY_NAME:
      if (Array.isArray(action.payload))
        return {
          ...state,
          gamesFiltered: action.payload,
          lastFilter: action.payload,
        };
      else
        return {
          ...state,
          gamesByName: [action.payload],
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
        gamesFiltered: [],
        lastFilter: [],
      };

    case REMOVE_GAME_DETAILS:
      return {
        ...state,
        gameDetails: [],
      };

    case ALPHABET_FILTER: {
      let gamesToFilter = gamesToFilterDeclaration(state);
      gamesToFilter = alphabeticFilter(gamesToFilter, action.payload);
      return {
        ...state,
        gamesFiltered: gamesToFilter,
        lastFilter: gamesToFilter,
      };
    }

    case RANKING_FILTER: {
      let gamesToFilter = gamesToFilterDeclaration(state);
      gamesToFilter = ratingFilter(gamesToFilter, action.payload);
      return {
        ...state,
        gamesFiltered: gamesToFilter,
        lastFilter: gamesToFilter,
      };
    }

    case FILTER_BY_GENRE: {
      let gamesToFilter = gamesToFilterDeclaration(state);
      return {
        ...state,
        gamesFiltered: genreFilter(
          gamesToFilter,
          action.payload,
          state.lastFilter
        ),
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
