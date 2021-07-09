import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  removeSearchedGamesByName,
  searchGameByName,
} from "../../Redux/actions";
import styles from "./SearchBar.module.css";

function SearchBar(props) {
  const [game, setGame] = useState("");
  const dispatch = useDispatch();

  const handleChange = async (e) => {
    await setGame(e.target.value);
    if (props.reset == true) dispatch(removeSearchedGamesByName());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(searchGameByName(game));
    setGame("");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label className={`${styles.label}`}>Looking for a game?</label>
        <input name="game" onChange={handleChange} value={game} />
        <button type="submit">Search</button>
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
