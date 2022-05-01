//import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import { positions, transitions, Provider } from "react-alert";
import AlertTemplate from "./components/alert/index";
import { BrowserRouter } from "react-router-dom";
import "./index.css";


const alertOptions = {
  timeout: 2500,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE,
};

const spinner = (
  <div class="spinner-border" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider template={AlertTemplate} {...alertOptions}>
    <BrowserRouter>
      <App className="bg" />
    </BrowserRouter>
  </Provider>
);
