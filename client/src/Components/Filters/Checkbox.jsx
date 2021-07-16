import React from "react";
import "./Checkbox.css";

function Checkbox(props) {
  return (
    <>
      <label class="b-contain">
        <input
          type="checkbox"
          key={props.key}
          value={props.value}
          onChange={props.onChange}
        />
        <div class="b-input"></div>
      </label>
    </>
  );
}

export default Checkbox;
