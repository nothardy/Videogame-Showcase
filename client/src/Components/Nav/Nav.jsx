import React from "react";
import { Link } from "react-router-dom";
import styles from "./Nav.module.css";

function Nav() {
  return (
    <>
      <div className={`${styles.navContainer}`}>
        <div className="Title">
          <h1>VideoGames App</h1>
        </div>
        <Link to="/" style={{ textDecoration: "none" }}>
          <div className={`${styles.home}`}>
            <h1>HOME</h1>
          </div>
        </Link>
        <div className="About">
          <h1>About</h1>
        </div>
        <div className={`${styles.henry}`}>
          <img src={"https://prep.soyhenry.com/logo.png"} alt="" />
        </div>
      </div>
    </>
  );
}

export default Nav;
