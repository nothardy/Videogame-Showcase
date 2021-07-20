import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";
function Nav() {
  return (
    <>
      <nav>
        <div className="logo">
          <h4>Videogame ShowCase</h4>
        </div>
        <ul className="nav-links">
          <Link className="react-link" to="/">
            <li>Home</li>
          </Link>
          <Link className="react-link" to="/about">
            <li>About</li>
          </Link>
        </ul>
      </nav>
    </>
  );
}

export default Nav;
