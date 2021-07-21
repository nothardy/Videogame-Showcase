import React from "react";
import "./NotFound.css";

function NotFound(props) {
  return (
    <>
      <div className="error-msg">
        <h4>{props.games.error}</h4>
      </div>
    </>
  );
}

export default NotFound;
