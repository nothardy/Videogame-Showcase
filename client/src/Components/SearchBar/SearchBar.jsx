import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  removeSearchedGamesByName,
  searchGameByName,
} from "../../Redux/actions";
import "./SearchBar.css";

function SearchBar(props) {
  const [game, setGame] = useState("");
  const dispatch = useDispatch();

  const handleChange = async (e) => {
    await setGame(e.target.value);
    if (props.reset === true) dispatch(removeSearchedGamesByName);
    if (game.charAt(0) === "") dispatch(removeSearchedGamesByName());
  };
  useEffect(() => {
    if (props.reset === true) setGame("");
  }, [props.reset]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(searchGameByName(game));
  };

  return (
    <>
      <div className="example">
        <div className="searchbar">
          <form onSubmit={handleSubmit}>
            <label className="label">Looking for a game? </label>
            <input
              className="searchbar-input"
              name="game"
              type="text"
              placeholder="Write it here..."
              onChange={handleChange}
              value={game}
            />
            <button className="button" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default SearchBar;
