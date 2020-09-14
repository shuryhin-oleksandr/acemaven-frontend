import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "./_UI/assets/fonts/ArchivoBlack-Regular.ttf"
import "./_UI/assets/fonts/Asap-Regular.ttf"
import "./_UI/assets/fonts/Raleway-VariableFont_wght.ttf"

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);

serviceWorker.unregister();
