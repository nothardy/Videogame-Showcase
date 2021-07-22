import axios from "axios";

export const GET_GAMES = "GET_GAMES",
  POST_GAME = "POST_GAME",
  SEARCH_GAME_BY_NAME = "SEARCH_GAME_BY_NAME",
  GET_GENRES = "GET_GENRES",
  REMOVE_SEARCHED_GAMES_BY_NAME = "REMOVE_SEARCHED_GAMES_BY_NAME",
  REMOVE_GAME_DETAILS = "REMOVE_GAME_DETAILS",
  GET_GAME_DETAILS = "GET_GAME_DETAILS",
  ALPHABET_FILTER = "ALPHABET_FILTER",
  RANKING_FILTER = "RATING_FILTER",
  NO_FILTER = "NO_FILTER",
  FILTER_BY_GENRE = "FILTER_BY_GENRE",
  GET_FEW_GAMES = "GET_FEW_GAMES";

export function getGames() {
  return (dispatch) => {
    axios.get("http://localhost:3001/videogames").then((response) => {
      dispatch({ type: GET_GAMES, payload: response.data });
    });
  };
}

export function getFewGames() {
  return (dispatch) => {
    axios
      .get("http://localhost:3001/videogames/getFewGames")
      .then((response) => {
        dispatch({ type: GET_FEW_GAMES, payload: response.data });
      });
  };
}

export function postGame(game) {
  return (dispatch) => {
    axios
      .post("http://localhost:3001/videogames", game, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        dispatch({ type: POST_GAME, payload: response.data.gameCreated });
      });
  };
}

export function searchGameByName(game) {
  return (dispatch) => {
    axios
      .get(`http://localhost:3001/videogames?name=${game}`)
      .then((response) => {
        dispatch({ type: SEARCH_GAME_BY_NAME, payload: response.data });
      });
  };
}

export function getGenres() {
  return (dispatch) => {
    axios.get("http://localhost:3001/genres").then((response) => {
      dispatch({ type: GET_GENRES, payload: response.data.genres });
    });
  };
}

export function removeSearchedGamesByName() {
  return (dispatch) => {
    dispatch({ type: REMOVE_SEARCHED_GAMES_BY_NAME });
  };
}

export function removeGameDetails() {
  return (dispatch) => {
    dispatch({ type: REMOVE_GAME_DETAILS });
  };
}

export function getGameDetails(gameId) {
  return (dispatch) => {
    axios
      .get(`http://localhost:3001/videogames/searchById/${gameId}`)
      .then((response) => {
        dispatch({ type: GET_GAME_DETAILS, payload: response.data });
      });
  };
}

export function alphabeticFilter(typeOfFilter) {
  return {
    type: ALPHABET_FILTER,
    payload: typeOfFilter,
  };
}

export function rankingFilter(typeOfFilter) {
  return {
    type: RANKING_FILTER,
    payload: typeOfFilter,
  };
}

export function noFilter() {
  return {
    type: NO_FILTER,
  };
}

export function filterByGenre(genresToFilter) {
  return {
    type: FILTER_BY_GENRE,
    payload: genresToFilter,
  };
}
