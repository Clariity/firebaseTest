import React from "react";

import Routes from "./routing/Routes";
import { BrowserRouter as Router } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes />
    </Router>
  );
}

export default App;
