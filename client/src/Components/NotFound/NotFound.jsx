import React from "react";
import "./NotFound.css";

function NotFound(props) {
  return (
    <>
      <div className="error-msg">
        <h4 className="h4-error">{props.games.error}</h4>
      </div>
    </>
  );
}

export default NotFound;
