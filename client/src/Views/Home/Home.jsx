import React, { useState, useEffect } from "react";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";
import { getFewGames, getGames, getGenres } from "../../Redux/actions";
import { useDispatch } from "react-redux";

function Home() {
  const [getData, setGetData] = useState({
    dataAlreadyFetched: false,
    buttonTitle: "Get Started",
  });
  const dispatch = useDispatch();

  const handleOnClick = async () => {
    if (getData.dataAlreadyFetched === false) {
      dispatch(getFewGames());
      dispatch(getGenres());
      dispatch(getGames());
      setGetData({
        ...getData,
        dataAlreadyFetched: true,
      });
    }
  };

  return (
    <>
      <div className={`${styles.bigContainer}`}>
        <div className="startButton">
          <Link to="/catalog">
            <button onClick={handleOnClick}>{getData.buttonTitle}</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Home;

/*
<div>
        <div className={styles.row}>
          <div>
            <img src={"https://prep.soyhenry.com/logo.png"} alt="" />{" "}
          </div>
          <div classname={styles.Title}>
            <h2>VideoGames app by Julian</h2>
          </div>
          <div classname={styles.col}></div>
        </div>
        <hr />
      </div>


      <div className="witcherImg">
          <img
            src={"https://images8.alphacoders.com/542/thumb-1920-542508.jpg"}
            alt=""
          />
        </div>
*/
