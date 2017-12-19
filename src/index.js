import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import ErrorBoundary from "./container/ErrorBoundary.js";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import "bootstrap/dist/css/bootstrap.css";

ReactDOM.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
  document.getElementById("root")
);
registerServiceWorker();
