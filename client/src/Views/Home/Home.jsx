import React, { useState, useEffect } from "react";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";
import { getFewGames, getGames, getGenres } from "../../Redux/actions";
import { useDispatch } from "react-redux";
import "./Home.css";

function Home() {
  const [getData, setGetData] = useState({
    dataAlreadyFetched: false,
    buttonTitle: "Get Started",
  });
  const dispatch = useDispatch();

  const handleOnClick = async () => {
    if (getData.dataAlreadyFetched === false) {
      // dispatch(getFewGames());
      // dispatch(getGenres());
      // dispatch(getGames());
      setGetData({
        ...getData,
        dataAlreadyFetched: true,
      });
    }
  };

  return (
    <>
      <div className="big-container">
        <div className="title-and-button">
          <h4 id="title">Wanna see games?</h4>
          <Link to="/catalog">
            <button className="start-button" onClick={handleOnClick}>
              <h4>{getData.buttonTitle}</h4>
            </button>
          </Link>
        </div>
        <img
          className="img"
          src="https://areajugones.sport.es/wp-content/uploads/2019/02/The-Witcher-Sapkowski.jpeg"
        />
      </div>
    </>
  );
}

export default Home;

/*
<div>
        <div classNameName={styles.row}>
          <div>
            <img src={"https://prep.soyhenry.com/logo.png"} alt="" />{" "}
          </div>
          <div classNamename={styles.Title}>
            <h2>VideoGames app by Julian</h2>
          </div>
          <div classNamename={styles.col}></div>
        </div>
        <hr />
      </div>


      <div classNameName="witcherImg">
          <img
            src={"https://images8.alphacoders.com/542/thumb-1920-542508.jpg"}
            alt=""
          />
        </div>
*/
/*
<div classNameName={`${styles.bigContainer}`}>
        <div classNameName="startButton">
          <Link to="/catalog">
            <button onClick={handleOnClick}>{getData.buttonTitle}</button>
          </Link>
        </div>
      </div> */
