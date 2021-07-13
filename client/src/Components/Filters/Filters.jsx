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
    dispatch(noFilter());
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
