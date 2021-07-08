import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchGameByName } from "../../Redux/actions";

function SearchBar() {
  const [game, setGame] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setGame(e.taret.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(searchGameByName(game));
    setGame("");
  };

  return (
    <>
      <form onChange={handleSubmit}>
        <label>Looking for a game?</label>
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
