import "./App.css";
import React from "react";
import { connect } from "react-redux";
import { Route } from "react-router";
import "./App.css";
import Home from "./Views/Home";
import Nav from "./Components/Nav";

function App() {
  return (
    <>
      <Nav />
      <Route path="/" exact>
        <Home />
      </Route>
    </>
  );
}

export default App;
/*<div className="App">
      <h1>Henry Videogames</h1>
    </div>*/
