import React, { useState } from "react";
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
    console.log(e.target.value);
    await setGame(e.target.value);
    if (props.reset == true) dispatch(removeSearchedGamesByName);
    if (game.charAt(0) == "") dispatch(removeSearchedGamesByName());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(searchGameByName(game));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label className="label">Looking for a game?</label>
        <input
          className="searchbar-input"
          name="game"
          placeholder="Write it here..."
          onChange={handleChange}
          value={game}
        />
        <button type="submit">
          <i class="fa-solid fa-magnifying-glass">Search</i>
        </button>
      </form>
    </>
  );
}

export default SearchBar;

// export default function SearchBar({searchFunction}){

//   const [city,setCity] = useState([]);

//   const onButtonClick = (e)=>{
//     e.preventDefault();
//     searchFunction(city);
//   }

//   return(
//         <div className={styles.searchBar}>
//           <input onEnter={onButtonClick} placeholder={"Enter a city..."} onChange={(e)=>{setCity(e.target.value)}} type={"text"}/>
//           <button type={"submit"} onClick={onButtonClick}>Add</button>
//         </div>
//   )
//  }
