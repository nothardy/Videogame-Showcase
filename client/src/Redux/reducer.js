import {
  GET_GAMES,
  GET_GAME_DETAILS,
  GET_GENRES,
  POST_GAME,
  REMOVE_SEARCHED_GAMES_BY_NAME,
  SEARCH_GAME_BY_NAME,
} from "./actions";

let initialState = {
  games: [],
  gamesByName: [],
  genres: [],
  gameDetails: {},
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
    default:
      return state;
  }
};

export default reducer;
