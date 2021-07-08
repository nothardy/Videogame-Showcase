import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <>
      <div className="navContainer">
        <div className="Title">
          <h1>VideoGames App</h1>
        </div>
        <div className="About">
          <p>About</p>
        </div>
        <Link to="/">
          <div className="About">
            <p>HOME</p>
          </div>
        </Link>
        <div className="Henry">
          <img src={"https://prep.soyhenry.com/logo.png"} alt="" />
        </div>
      </div>
    </>
  );
}

export default Nav;
