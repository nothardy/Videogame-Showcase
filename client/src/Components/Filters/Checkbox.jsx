import React from "react";
import "./Checkbox.css";

function Checkbox(props) {
  return (
    <>
      <label className="b-contain">
        <input type="checkbox" value={props.value} onChange={props.onChange} />
        <div className="b-input"></div>
      </label>
    </>
  );
}

export default Checkbox;
