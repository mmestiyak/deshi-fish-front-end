import React from "react";
import "./styles/App.css";
import { FishesProvider } from "./contexts/FishesContext";
import Dashboard from "./components/Dashboard";
import Fishes from "./components/Fishes";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <FishesProvider>
        <Navbar />
        <Route exact path="/">
          <Fishes />
        </Route>
        <Route exact path="/admin">
          <Dashboard />
        </Route>
      </FishesProvider>
    </Router>
  );
};

export default App;
