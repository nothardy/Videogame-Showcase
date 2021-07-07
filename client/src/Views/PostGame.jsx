import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postGame } from "../Redux/actions";
import { Link } from "react-router-dom";

const GAME_TEMPLATE = {
  name: "",
  description: "",
  release_date: "",
  rating: "",
  background_img: "",
  platforms: [],
  genres: [],
};

function PostGame() {
  const [game, setGame] = useState(GAME_TEMPLATE);
  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    setGame({
      ...game,
      [e.target.name]: e.taret.value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(postGame(game));
    setGame(GAME_TEMPLATE);
  };

  return (
    <>
      <Link to="/catalog">
        <button className="backtoshowcase">back To Showcase</button>
      </Link>

      <h3>Post Your Own Game!</h3>
      <form onSubmit={handleOnSubmit}>
        <label>Name</label>
        <input name="name" value={game.name} onChange={handleOnChange} />
        <label>Description</label>
        <textarea
          name="description"
          value={game.description}
          onChange={handleOnChange}
        />
        <label>Release Date</label>
        <input
          name="release_date"
          value={game.release_date}
          onChange={handleOnChange}
        />
        <label>Rating</label>
        <input name="rating" value={game.rating} onChange={handleOnChange} />
        <label>Background Image</label>
        <input
          name="background_img"
          value={game.background_img}
          onChange={handleOnChange}
        />
        <label>Platforms</label>
        <input
          name="platforms"
          value={game.platforms}
          onChange={handleOnChange}
        />
        <label>Genres</label>
        <input name="genres" value={game.genres} onChange={handleOnChange} />
        <button type="submit">Add Game</button>
      </form>
    </>
  );
}

export default PostGame;
