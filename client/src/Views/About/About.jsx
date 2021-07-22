import React from "react";
import { Link } from "react-router-dom";
function About() {
  return (
    <>
      <Link className="react-link" to="/catalog">
        <div className="back-to-showcase">
          <button>back To Showcase</button>
        </div>
      </Link>
      <div className="text-row">
        <div className="profile">
          <h4>
            Hi! I'm Julian Piñel, Full-Stack Web Developer and also a
            Electronics Engineering student.
          </h4>
          <p>This is a Videogame Showcase App I made for Henry Bootcamp</p>
          <p>For more information here is my</p>{" "}
          <Link
            className="react-link"
            to="https://www.linkedin.com/in/julian-pi%C3%B1el/"
          >
            <p>LinkedIn Profile</p>
          </Link>
        </div>
        <div className="tools">
          <h4>
            Here is a list of tools and frameworks used to develop this app:
          </h4>
          <p>Front-End</p>
          <ul>
            <li>React JS and Redux</li>
            <li>Styles made with pure CSS</li>
          </ul>
          <p>Back-End</p>
          <ul>
            <li>Node JS and Express</li>
            <li>Relational Database made with PostgreSQL and Sequelize</li>
            <li>Tests run with mocha</li>
          </ul>
        </div>
        <div className="api-description">
          <p>
            This Videogame Showcase consumes an free api using axios library,
            processes videogame data on backend server and show, order or filter
            games on frontend server. User can also add games to database. At
            the moment this database only supports images provided by a link,
            future hotfixes will allow the user to add an image file.
          </p>
        </div>
      </div>
    </>
  );
}

export default About;
