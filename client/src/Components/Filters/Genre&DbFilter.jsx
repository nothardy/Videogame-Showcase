import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByGenre } from "../../Redux/actions";
import "./Genre&DbFilter.css";
import Checkbox from "./Checkbox";

function GenreAndDbFilter() {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);
  const [genresToFilter, setGenresToFilter] = useState([]);

  const handleOnChange = (e) => {
    const clickedGenre = e.target.value;
    let newGenresToFilter = genresToFilter;

    if (genresToFilter.includes(clickedGenre)) {
      newGenresToFilter.splice(newGenresToFilter.indexOf(clickedGenre), 1);
    } else {
      newGenresToFilter.pop();
      newGenresToFilter.push(clickedGenre);
    }
    setGenresToFilter(newGenresToFilter);
    dispatch(filterByGenre(genresToFilter));
  };

  return (
    <>
      <div className="genre-checkbox">
        <div className="db-checkbox">
          <div className="genres-text">{"From Db "}</div>
          <div>
            <Checkbox key={20} value={"From Db"} onChange={handleOnChange} />
          </div>
        </div>
        {genres.map((genre) => (
          <div key={genre.id} className="genre-container">
            <div className="genres-text">{genre.name + " "}</div>
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
