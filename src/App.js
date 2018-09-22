import React from "react";
import Jumbotron from "./components/Jumbotron";
import Gamefield from "./components/Gamefield";
import "./App.css";


const App = () => (
  <div className="container-fluid bodyBox">
    <Jumbotron />
    <Gamefield /> 
  </div>
);

export default App;