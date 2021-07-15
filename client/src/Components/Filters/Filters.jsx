import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { alphabeticFilter, noFilter, rankingFilter } from "../../Redux/actions";
import "./Filters.css";
export const AZ = "A-Z",
  ZA = "Z-A",
  HIGHEST = "From Highest Rating",
  LOWEST = "From Lowest Rating",
  ALL = "All Games";

function Filters() {
  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    const typeOfFiltering = e.target.value;
    //dispatch(noFilter());
    switch (typeOfFiltering) {
      case AZ:
        dispatch(alphabeticFilter(typeOfFiltering));
        break;
      case ZA:
        dispatch(alphabeticFilter(typeOfFiltering));
        break;
      case HIGHEST:
        dispatch(rankingFilter(typeOfFiltering));
        break;
      case LOWEST:
        dispatch(rankingFilter(typeOfFiltering));
        break;
      //   case ALL:
      //     dispatch(noFilter());
      //     break;
      default:
        dispatch(noFilter());
        break;
    }
  };

  return (
    <>
      <select name="filter" onChange={handleOnChange} className="filter-select">
        <option disabled="disabled" selected="selected">
          Choose a Filter
        </option>
        <option>{ALL}</option>
        <option>{AZ}</option>
        <option>{ZA}</option>
        <option>{HIGHEST}</option>
        <option>{LOWEST}</option>
      </select>
    </>
  );
}

export default Filters;
