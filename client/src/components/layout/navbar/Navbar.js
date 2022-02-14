import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";

const Navbar = ({ title }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = (e) => {
    e.preventDefault();
    setOpen(!open);
  };

  return (
    <Fragment>
      <div className="navbar bg-primary">
        <div className="container" style={{ position: "relative" }}>
          <h1>
            <Link to="/">{title}</Link>
          </h1>
          <button onClick={handleOpen} style={{ zIndex: "999999" }}>
            <FontAwesomeIcon
              icon={faPlusCircle}
              style={{
                color: "#fff",
                fontSize: "1.5rem",
                transform: open ? "rotate(45deg)" : "",
                transition: "transform 150ms ease",
              }}
            />
          </button>
          <div
            className="card bg-dark"
            style={{
              position: "absolute",
              top: "0",
              right: "0",
              zIndex: "999",
              display: open ? "block" : "none",
              opacity: "0.9",
              transform: "translate(-12px, 12px)",
            }}
          >
            <h2 className="text-left">Actions</h2>
            <p>Choose an action type</p>
            <ul className="list">
              <li>
                <Link to="/add-travel">Travel</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const styles = {
  modal: {
    height: "100vh",
    backgroundColor: "rgba(255,255,255,0.8",
  },
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
};

Navbar.defaultProps = {
  title: "Travel Green",
};

export default Navbar;
