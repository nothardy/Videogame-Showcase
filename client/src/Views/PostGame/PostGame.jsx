import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGames, postGame } from "../../Redux/actions";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import ListSelector from "../../Components/ListSelector/ListSelector";
import "./PostGame.css";

const GAME_TEMPLATE = {
  name: "",
  description: "",
  release_date: "",
  rating: 0,
  background_img: "",
  platforms: [],
  genres: [],
  redirect: false,
};
const platforms = [
  { name: "PC" },
  { name: "PlayStation 1" },
  { name: "PlayStation 2" },
  { name: "PlayStation 3" },
  { name: "PlayStation 4" },
  { name: "PlayStation 5" },
  { name: "XBox 360" },
  { name: "XBox One" },
  { name: "XBox Series X" },
  { name: "Nintendo" },
  { name: "Wii" },
  { name: "Sega" },
];

function PostGame() {
  const [game, setGame] = useState(GAME_TEMPLATE);
  const [gameDataFullfilled, setGameDataFullfilled] = useState(false);
  const dbGenres = useSelector((state) => state.genres);
  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    if (e.target.name === "genres") {
      setGame({ ...game, genres: [...game.genres, e.target.value] });
      e.target.value = "";
    } else if (e.target.name === "platforms") {
      setGame({ ...game, platforms: [...game.platforms, e.target.value] });
      e.target.value = "";
    } else
      setGame({
        ...game,
        [e.target.name]: e.target.value,
      });
  };

  // useEffect(() => {
  //   if (game.redirect === true && gameDataFullfilled === false) {
  //     setGame(GAME_TEMPLATE);
  //     setGameDataFullfilled(true);
  //   }
  // }, [gameDataFullfilled]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    dispatch(postGame(game));
    dispatch(getGames());
    setGame({
      ...game,
      redirect: true,
    });
    setGameDataFullfilled(true);
  };

  return gameDataFullfilled === true ? (
    <Redirect to="/catalog" />
  ) : (
    <>
      <div className="back-to-showcase">
        <Link className="react-link" to="/catalog">
          <button>back To Showcase</button>
        </Link>
      </div>
      <div className="add-game">
        <form data-testid="postgame" onSubmit={handleOnSubmit}>
          <div className="text-box">
            <input
              type="text"
              name="name"
              value={game.name}
              onChange={handleOnChange}
            />
            <label>Title</label>
          </div>
          <div className="text-box">
            <textarea
              type="description"
              name="description"
              value={game.description}
              onChange={handleOnChange}
            />
            <label>Description</label>
          </div>
          <div className="text-box">
            <input
              type="date"
              name="release_date"
              value={game.release_date}
              onChange={handleOnChange}
            />
            <label>Release Date</label>
          </div>
          <div className="text-box">
            <input
              type="text"
              name="rating"
              value={game.rating}
              onChange={handleOnChange}
            />
            <label>Rating</label>
          </div>
          <div className="text-box">
            <input
              type="text"
              name="background_img"
              value={game.background_img}
              onChange={handleOnChange}
            />
            <label>Background Image</label>
          </div>
          <div className="selectors">
            <ListSelector
              itemToSelect="platforms"
              itemsList={platforms}
              selectorHandler={handleOnChange}
            />
            {game.platforms.map((platform, index) => (
              <li key={index}>{platform}</li>
            ))}
          </div>
          <div className="selectors">
            <ListSelector
              className="list-selector"
              itemToSelect="genres"
              itemsList={dbGenres}
              selectorHandler={handleOnChange}
            />
            {game.genres.map((genre, index) => (
              <li key={index}>{genre}</li>
            ))}
          </div>
          <button data-testid="submit-button" type="submit">
            Add Game
          </button>
        </form>
      </div>
    </>
  );
}

export default PostGame;

/*
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
        <>
          <ListSelector
            itemToSelect="platforms"
            itemsList={platforms}
            selectorHandler={handleOnChange}
          />
          {game.platforms.map((platform, index) => (
            <li key={index}>{platform}</li>
          ))}
        </>
        <>
          <ListSelector
            itemToSelect="genres"
            itemsList={dbGenres}
            selectorHandler={handleOnChange}
          />
          {game.genres.map((genre, index) => (
            <li key={index}>{genre}</li>
          ))}
        </>
        <button type="submit">Add Game</button>
      </form>
*/

/*
<input
          name="platforms"
          value={game.platforms}
          onChange={handleOnChange}
        />


        <input name="genres" value={game.genres} onChange={handleOnChange} />

*/
