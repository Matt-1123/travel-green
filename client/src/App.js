import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/navbar/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import NotFound from "./components/pages/NotFound";
import AuthState from "./context/auth/AuthState";
import TravelState from "./context/travel/TravelState";
import TravelForm from "./components/travel/TravelForm";
import TravelSummary from "./components/travel/TravelSummary";
import TravelAction from "./components/travel/TravelAction";
import "./App.css";

const App = () => {
  return (
    <AuthState>
      <TravelState>
        <Router>
          <Fragment>
            <Navbar />
            <div
              className="container container-dark"
              style={{ marginBottom: "3rem" }}
            >
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/about" element={<About />} />
                <Route exact path="/add-travel" element={<TravelForm />} />
                <Route
                  exact
                  path="/add-travel/summary"
                  element={<TravelSummary />}
                />
                <Route
                  exact
                  path="/travel-action/:id"
                  element={<TravelAction />}
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
            <Footer />
          </Fragment>
        </Router>
      </TravelState>
    </AuthState>
  );
};

export default App;
