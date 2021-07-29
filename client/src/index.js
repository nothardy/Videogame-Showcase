import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Redux/store";
import { createBrowserHistory } from "history";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
export const browserHistory = createBrowserHistory();

axios.defaults.baseURL =
  process.env.REACT_APP_BACKEND || "http://localhost:3001";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
