import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByGenre, noFilter } from "../../Redux/actions";
import "./Genre&DbFilter.css";

function GenreAndDbFilter() {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);
  const [genresToFilter, setGenresToFilter] = useState([]);
  //const genresToFilter = [];

  const handleOnChange = (e) => {
    const clickedGenre = e.target.value;
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
        <label htmlFor="">
          {"From Db "}
          <input type="checkbox" onChange={handleOnChange} value={"From Db"} />
        </label>
        {genres.map((genre) => (
          <div key={genre.id} className="genre-container">
            <label htmlFor="">
              {genre.name + " "}
              <input
                key={genre.id}
                type="checkbox"
                value={genre.name}
                onChange={handleOnChange}
              />
            </label>
          </div>
        ))}
      </div>
    </>
  );
}

export default GenreAndDbFilter;
