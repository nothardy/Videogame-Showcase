import axios from "axios";

export const GET_GAMES = "GET_GAMES";
export const POST_GAME = "POST_GAME";
export const SEARCH_GAME_BY_NAME = "SEARCH_GAME_BY_NAME";

export function getGames() {
  return (dispatch) => {
    axios.get("http://localhost:3001/videogames").then((response) => {
      dispatch({ type: GET_GAMES, payload: response.data });
    });
  };
}

export async function postGame(game) {
  try {
    await axios.post("http://localhost:3001/videogames", game);
  } catch (error) {
    console.log(error);
  }
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
