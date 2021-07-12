import axios from "axios";

export const GET_GAMES = "GET_GAMES";
export const POST_GAME = "POST_GAME";
export const SEARCH_GAME_BY_NAME = "SEARCH_GAME_BY_NAME";
export const GET_GENRES = "GET_GENRES";
export const REMOVE_SEARCHED_GAMES_BY_NAME = "REMOVE_SEARCHED_GAMES_BY_NAME";
export const GET_GAME_DETAILS = "GET_GAME_DETAILS";
export const ALPHABET_FILTER = "ALPHABET_FILTER";
export const RANKING_FILTER = "RATING_FILTER";
export const NO_FILTER = "NO_FILTER";

export function getGames() {
  return (dispatch) => {
    axios.get("http://localhost:3001/videogames").then((response) => {
      dispatch({ type: GET_GAMES, payload: response.data });
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

//headers: { "Content-Type": "text/plain" }

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
