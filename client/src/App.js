import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/navbar/Navbar";
import Alerts from "./components/layout/Alerts";
import Footer from "./components/layout/Footer";
import Home from "./components/pages/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import About from "./components/pages/About";
import NotFound from "./components/pages/NotFound";
import TravelForm from "./components/travel/TravelForm";
import TravelSummary from "./components/travel/TravelSummary";
import TravelAction from "./components/travel/TravelAction";
import PrivateRoute from "./components/routing/PrivateRoute";

import AuthState from "./context/auth/AuthState";
import TravelState from "./context/travel/TravelState";
import AlertState from "./context/alert/AlertState";

import setAuthToken from "./utils/setAuthToken";

import "./App.css";

import ReactGA from "react-ga4";
ReactGA.initialize("G-7R5TN6KD5C");
ReactGA.send("pageview");

// Set JSON Web Token as a common header in axios
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <TravelState>
        <AlertState>
          <Router>
            <Fragment>
              <Navbar />
              <div
                className="container container-dark"
                style={{ marginBottom: "3rem", minHeight: "80vh" }}
              >
                <Alerts />
                <Routes>
                  <Route
                    exact
                    path="/"
                    element={
                      <PrivateRoute>
                        <Home />
                      </PrivateRoute>
                    }
                  />
                  <Route exact path="/register" element={<Register />} />
                  <Route exact path="/login" element={<Login />} />
                  <Route exact path="/about" element={<About />} />
                  <Route
                    exact
                    path="/add-travel"
                    element={
                      <PrivateRoute>
                        <TravelForm />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    exact
                    path="/add-travel/summary"
                    element={
                      <PrivateRoute>
                        <TravelSummary />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    exact
                    path="/travel-action/:id"
                    element={
                      <PrivateRoute>
                        <TravelAction />
                      </PrivateRoute>
                    }
                  />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
              <Footer />
            </Fragment>
          </Router>
        </AlertState>
      </TravelState>
    </AuthState>
  );
};

export default App;
