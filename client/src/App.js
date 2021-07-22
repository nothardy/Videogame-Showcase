import "./App.css";
import React from "react";
import { Route } from "react-router";
import "./App.css";
import Home from "./Views/Home/Home";
import GameCatalog from "./Views/GameCatalog/GameCatalog";
import Nav from "./Components/Nav/Nav";
import PostGame from "./Views/PostGame/PostGame";
import GameDetail from "./Views/GameDetail/GameDetail";
import About from "./Views/About/About";

function App() {
  return (
    <div>
      <Nav />
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/catalog" exact>
        <GameCatalog />
      </Route>
      <Route path="/catalog/:gameId">
        <GameDetail />
      </Route>
      <Route path="/postgame" exact>
        <PostGame />
      </Route>
      <Route path="/about">
        <About />
      </Route>
    </div>
  );
}

export default App;
/*<div className="App">
      <h1>Henry Videogames</h1>
    </div>*/
