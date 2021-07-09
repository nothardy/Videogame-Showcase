import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import { getGames, removeSearchedGamesByName } from "../Redux/actions";
import { Link } from "react-router-dom";
import Showcase from "../Components/Showcase/Showcase";
import Game from "../Components/Game/Game";
import styles from "./GameCatalog.module.css";
import SearchBar from "../Components/SearchBar/SearchBar";

// PAGINATION OCCURS HERE

const renderGames = (games) => {
  return (
    <ul>
      {games.map((game, index) => {
        return (
          <li key={index}>
            <Game game={game} />
          </li>
        );
      })}
    </ul>
  );
};

export function GameCatalog(props) {
  //Redux Hooks
  //   let games = useSelector((state) => state.games);
  //   let gamesByName = useSelector((state) => state.gamesByName);
  let games = props.games;
  let gamesByName = props.gamesByName;
  const dispatch = useDispatch();
  //React Hooks
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [resetFlag, setResetFlag] = useState(false);
  const [shownGames, setShownGames] = useState(props.games);
  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  const handleReset = async () => {
    setResetFlag("wanna change");
    dispatch(removeSearchedGamesByName());
  };

  const pages = [];
  for (let i = 1; i <= Math.ceil(shownGames.length / itemsPerPage); i++) {
    pages.push(i);
  }

  let indexOfLastItem = currentPage * itemsPerPage;

  let indexOfFirstItem = indexOfLastItem - itemsPerPage;

  let currentItems = shownGames.slice(indexOfFirstItem, indexOfLastItem);

  let renderPageNumbers = pages.map((number) => {
    return (
      <li key={number} id={number} onClick={handleClick}>
        {number}
      </li>
    );
  });

  useEffect(() => {
    dispatch(getGames);
    if (props.gamesByName > 0) {
      setShownGames(props.gamesByName);
    } else {
      setShownGames(props.games);
    }

    if (resetFlag == "wanna change") setResetFlag(true);
    //if (gamesByName.length > 0) games = gamesByName;
  }, [dispatch, gamesByName, resetFlag]);

  return (
    <>
      <h3 className={`${styles.title}`}>Games</h3>
      <Link to="/postgame">
        <button className="postGame">Add your own Game!</button>
      </Link>
      <SearchBar reset={resetFlag} />
      <button className="gameFilterByName" onClick={handleReset}>
        Reset Name Filter
      </button>

      {renderGames(currentItems)}
      <ul className={`${styles.pageNumbers}`}>{renderPageNumbers}</ul>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    games: state.games,
    gamesByName: state.gamesByName,
  };
};

export default connect(mapStateToProps)(GameCatalog);
