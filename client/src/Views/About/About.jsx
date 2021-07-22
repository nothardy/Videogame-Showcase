import React from "react";
import { Link } from "react-router-dom";
import "./About.css";

function About() {
  return (
    <>
      <Link className="react-link" to="/catalog">
        <div className="back-to-showcase">
          <button>back To Showcase</button>
        </div>
      </Link>
      <div className="text-column">
        <div className="profile">
          <h4>
            My name is Julian, I am Full-Stack Web Developer and also a
            Electronics Engineering student.
          </h4>
          <p>This is a Videogame Showcase App I made for Henry Bootcamp.</p>
          <p>
            For more information here is my{" "}
            <a
              className="react-link"
              href="https://www.linkedin.com/in/julian-pi%C3%B1el/"
              target="_blank"
              rel="noreferrer"
            >
              <img
                className="linkedin-img"
                src="https://www.premiereactors.com/wp-content/uploads/2014/08/LinkedIn_logo_initials.png"
                alt="linkedin"
              />
            </a>
          </p>
        </div>
        <div className="tools">
          <h4>Tools and frameworks used to develop this app:</h4>
          <h5>Front-End</h5>
          <ul>
            <li>React JS and Redux</li>
            <li>Styles made with pure CSS.</li>
          </ul>
          <h5>Back-End</h5>
          <ul>
            <li>Node JS and Express.</li>
            <li>Relational Database made with PostgreSQL and Sequelize.</li>
            <li>Tests run with mocha and enzyme.</li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default About;

/*
<div className="api-description">
          <h4>Description</h4>
          <p>
            This Videogame Showcase consumes an free api using axios library,
            processes videogame data on backend server and show, order or filter
            games on frontend server. User can also add games to database. At
            the moment this database only supports images provided by a link,
            future hotfixes will allow the user to add an image file.
          </p>
        </div>
*/
