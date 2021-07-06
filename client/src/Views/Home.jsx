import React from "react";
import styles from "./Home.module.css";

function Home() {
  return (
    <>
      <div className="bigContainer">
        <div className="startButton">
          <button>Get Started</button>
        </div>
        <div className="witcherImg">
          <img src={"#"} alt="" />
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
*/
