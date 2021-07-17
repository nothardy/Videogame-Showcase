import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByGenre } from "../../Redux/actions";
import "./Genre&DbFilter.css";
//import "./Checkbox.css";
import Checkbox from "./Checkbox";

function GenreAndDbFilter() {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);
  const [genresToFilter, setGenresToFilter] = useState([]);
  //const genresToFilter = [];

  const handleOnChange = (e) => {
    const clickedGenre = e.target.value;
    console.log(clickedGenre);
    let newGenresToFilter = genresToFilter;
    genresToFilter.includes(clickedGenre)
      ? newGenresToFilter.splice(newGenresToFilter.indexOf(clickedGenre), 1)
      : newGenresToFilter.push(clickedGenre);
    setGenresToFilter(newGenresToFilter);

    console.log(genresToFilter);
    //dispatch(noFilter());
    dispatch(filterByGenre(genresToFilter));
  };

  return (
    <>
      <div className="genre-checkbox">
        <div className="db-checkbox">
          <div>{"From Db "}</div>
          <div>
            <Checkbox key={20} value={"From Db"} onChange={handleOnChange} />
          </div>
        </div>
        {genres.map((genre) => (
          <div key={genre.id} className="genre-container">
            <div>{genre.name + " "}</div>
            <div>
              <Checkbox
                key={genre.id}
                value={genre.name}
                onChange={handleOnChange}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default GenreAndDbFilter;

/* <input
                key={genre.id}
                type="checkbox"
                value={genre.name}
                onChange={handleOnChange}
              />
              */
