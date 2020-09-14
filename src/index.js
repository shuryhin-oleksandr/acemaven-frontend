import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "../src/assets/fonts/HelveticaNeu Bold.ttf"
import "../src/assets/fonts/HelveticaNeue BlackCond.ttf"
import "../src/assets/fonts/HelveticaNeue Cursive.ttf"
import "../src/assets/fonts/HelveticaNeue Heavy.ttf"
import "../src/assets/fonts/HelveticaNeue Light.ttf"
import "../src/assets/fonts/HelveticaNeue Medium.ttf"
import "../src/assets/fonts/HelveticaNeue Regular.ttf"
import "../src/assets/fonts/HelveticaNeue Thin.ttf"


ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);

serviceWorker.unregister();
