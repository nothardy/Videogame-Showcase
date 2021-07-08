import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGames } from "../Redux/actions";
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

export function GameCatalog() {
  //Redux Hooks
  const games = useSelector((state) => state.games);
  const gamesByName = useSelector((state) => state.gamesByName);
  const dispatch = useDispatch();
  //React Hooks
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  const pages = [];
  for (let i = 1; i <= Math.ceil(games.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;

  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = games.slice(indexOfFirstItem, indexOfLastItem);

  const renderPageNumbers = pages.map((number) => {
    return (
      <li key={number} id={number} onClick={handleClick}>
        {number}
      </li>
    );
  });

  useEffect(() => {
    dispatch(getGames);
    if (gamesByName.length > 0) games = gamesByName;
  }, [dispatch, gamesByName]);

  return (
    <>
      <h3>Games</h3>
      <Link to="/postgame">
        <button className="postGame">Add your own Game!</button>
      </Link>
      <SearchBar />
      {renderGames(currentItems)}
      <ul className={`${styles.pageNumbers}`}>{renderPageNumbers}</ul>
    </>
  );
}

export default GameCatalog;
