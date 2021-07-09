import {
  GET_GAMES,
  GET_GENRES,
  POST_GAME,
  SEARCH_GAME_BY_NAME,
} from "./actions";

let initialState = {
  games: [],
  gamesByName: [],
  genres: [],
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
    default:
      return state;
  }
};

export default reducer;
