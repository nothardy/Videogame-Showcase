import React from "react";
import "./Checkbox.css";

function Checkbox(props) {
  return (
    <>
      <label class="b-contain">
        <input type="checkbox" value={props.value} onChange={props.onChange} />
        <div class="b-input"></div>
      </label>
    </>
  );
}

export default Checkbox;
