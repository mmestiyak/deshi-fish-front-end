import React from "react";
import "./styles/App.css";
import { FishesProvider } from "./contexts/FishesContext";
import Dashboard from "./components/Dashboard";
import Fishes from "./components/Fishes";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/Login";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./PrivateRoute";
import Orders from "./components/Orders";
import Checkout from "./components/Checkout";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <FishesProvider>
          <Navbar />
          <Route exact path="/">
            <Fishes />
          </Route>
          <PrivateRoute exact path="/admin">
            <Dashboard />
          </PrivateRoute>
          <PrivateRoute exact path="/orders">
            <Orders />
          </PrivateRoute>
          <PrivateRoute path="/checkout">
            <Checkout />
          </PrivateRoute>
          <Route exact path="/signin">
            <Login />
          </Route>
        </FishesProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
