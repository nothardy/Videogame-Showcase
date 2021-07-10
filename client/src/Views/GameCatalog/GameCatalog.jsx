import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import { getGames, removeSearchedGamesByName } from "../../Redux/actions";
import { Link } from "react-router-dom";
import Showcase from "../../Components/Showcase/Showcase";
import Game from "../../Components/Game/Game";
import styles from "./GameCatalog.module.css";
import SearchBar from "../../Components/SearchBar/SearchBar";

// PAGINATION OCCURS HERE

const renderGames = (games) => {
  return (
    <ul>
      {games.map((game, index) => {
        return (
          <li key={index}>
            <Link to={`/catalog/${game.id}`} style={{ textDecoration: "none" }}>
              <Game game={game} />
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export function GameCatalog(props) {
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

  const pages = [];
  const paginate = (shownGames) => {
    for (let i = 1; i <= Math.ceil(shownGames.length / itemsPerPage); i++)
      pages.push(i);

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

    return [renderPageNumbers, currentItems];
  };
  let [renderPageNumbers, currentItems] = paginate(shownGames);

  const handleReset = async () => {
    setResetFlag(true);
    dispatch(removeSearchedGamesByName());
  };

  useEffect(async () => {
    if (!games.length > 0) dispatch(getGames);
    if (props.gamesByName.length > 0) {
      await setShownGames(props.gamesByName);
      [renderPageNumbers, currentItems] = paginate(shownGames);
    } else {
      await setShownGames(props.games);
      [renderPageNumbers, currentItems] = paginate(shownGames);
    }

    //if (gamesByName.length > 0) games = gamesByName;
  }, [dispatch, games, gamesByName, resetFlag]);

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
