import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import AuthState from "./context/auth/AuthState";
import TravelState from "./context/travel/TravelState";
import TravelAction from "./components/travel/TravelAction";
import "./App.css";

const App = () => {
  return (
    <AuthState>
      <TravelState>
        <Router>
          <Fragment>
            <Navbar />
            <div className="container">
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/about" element={<About />} />
                <Route exact path="/add-travel" element={<TravelAction />} />
              </Routes>
            </div>
          </Fragment>
        </Router>
      </TravelState>
    </AuthState>
  );
};

export default App;
