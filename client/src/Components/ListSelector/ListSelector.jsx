import React, { useState } from "react";
import "./ListSelector.css";

function ListSelector({ itemToSelect, itemsList, selectorHandler }) {
  const [selectorErrorHandler, setSelectorErrorHandler] = useState({
    errorMsg: "Error: You must select an item",
    errorFlag: true,
  });

  const handleChange = (e) => {
    if (itemToSelect == "platforms" && e.target.value.length > 2) {
      setSelectorErrorHandler({
        errorFlag: false,
        errorMsg: "",
      });
    } else if (itemToSelect == "genres" && e.target.value.length >= 1) {
      setSelectorErrorHandler({
        errorFlag: false,
        errorMsg: "",
      });
    }
  };

  return (
    <>
      <label htmlFor="">
        {itemToSelect} <br />
        <select
          className="list-selector"
          name={itemToSelect}
          onChange={handleChange}
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

/*
{selectorErrorHandler.errorFlag && (
          <p>{selectorErrorHandler.errorMsg}</p>
        )}
*/
