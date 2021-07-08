import "./App.css";
import React from "react";
import { connect } from "react-redux";
import { Route } from "react-router";
import "./App.css";
import Home from "./Views/Home";
import GameCatalog from "./Views/GameCatalog";
import Nav from "./Components/Nav/Nav";
import PostGame from "./Views/PostGame";

function App() {
  return (
    <>
      <Nav />
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/catalog" exact>
        <GameCatalog />
      </Route>
      <Route path="/postgame" exact>
        <PostGame />
      </Route>
    </>
  );
}

export default App;
/*<div className="App">
      <h1>Henry Videogames</h1>
    </div>*/
