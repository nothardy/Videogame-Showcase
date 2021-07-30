import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import witcherImg from "./witcher.jpg";

function Home() {
  const [getData, setGetData] = useState({
    dataAlreadyFetched: false,
    buttonTitle: "Get Started",
  });

  const handleOnClick = async () => {
    if (getData.dataAlreadyFetched === false) {
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
          <h4 id="title">Wanna play games?</h4>
          <Link to="/catalog">
            <button className="start-button" onClick={handleOnClick}>
              <h4>{getData.buttonTitle}</h4>
            </button>
          </Link>
        </div>
        <img className="img" src={witcherImg} alt="Missing" />
      </div>
    </>
  );
}

export default Home;
