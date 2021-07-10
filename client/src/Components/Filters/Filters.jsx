import React from "react";
import { useDispatch } from "react-redux";
import { alphabeticFilter, noFilter, rankingFilter } from "../../Redux/actions";
export const AZ = "A-Z";
export const ZA = "Z-A";
export const HIGHEST = "From Highest Rating";
export const LOWEST = "From Lowest Rating";
export const ALL = "All Games;";

function Filters() {
  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    const typeOfFiltering = e.target.value;
    switch (typeOfFiltering) {
      case AZ:
        dispatch(alphabeticFilter(typeOfFiltering));
      case ZA:
        dispatch(alphabeticFilter(typeOfFiltering));
      case HIGHEST:
        dispatch(rankingFilter(typeOfFiltering));
      case LOWEST:
        dispatch(rankingFilter(typeOfFiltering));
      case ALL:
        dispatch(noFilter());
      default:
        break;
    }
  };

  return (
    <>
      <select name="filter" onChange={handleOnChange} className="filter-select">
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
