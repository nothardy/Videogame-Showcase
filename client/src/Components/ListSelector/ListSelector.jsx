import React from "react";
import "./ListSelector.css";

function ListSelector({ itemToSelect, itemsList, selectorHandler }) {
  return (
    <>
      <label htmlFor="">
        {itemToSelect} <br />
        <select
          className="list-selector"
          name={itemToSelect}
          onInput={selectorHandler}
        >
          <option>----</option>

          {itemsList.map((item, index) => (
            <option className="list-selector" value={item.name} key={index}>
              {item.name}
            </option>
          ))}
        </select>
      </label>
    </>
  );
}

export default ListSelector;
