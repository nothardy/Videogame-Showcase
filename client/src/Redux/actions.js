import axios from "axios";

export const GET_GAMES = "GET_GAMES";

export function getGames() {
  return (dispatch) => {
    axios.get("http://localhost:3001/videogames/apigames").then((response) => {
      dispatch({ type: GET_GAMES, payload: response.data });
    });
  };
}
