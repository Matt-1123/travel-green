import React, { Fragment, useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";

const Navbar = ({ title }) => {
  // 'Add Action' dropdown menu
  const [openActionMenu, setOpenActionMenu] = useState(false);

  // 'Add Action' dropdown ref and close button ref
  const addActionRef = useRef();
  const addActionBtnRef = useRef();

  useEffect(() => {
    if (openActionMenu) {
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [openActionMenu]);

  // Toggle 'Add Action' dropdown
  const handleOpenActionMenu = () => {
    setOpenActionMenu(!openActionMenu);
  };

  // -------------------------
  // Event Listeners
  // -------------------------

  // If 'Add Action' dropdown is open and the user clicks outside of the dropdown or its close button, call the handleOpenActionMenu function to close the dropdown.
  const handleClickOutside = (event) => {
    if (
      addActionRef.current &&
      !addActionRef.current.contains(event.target) &&
      !addActionBtnRef.current.contains(event.target)
    ) {
      handleOpenActionMenu();
      document.removeEventListener("mousedown", handleClickOutside);
    }
  };

  return (
    <Fragment>
      <div className="navbar bg-primary">
        <div className="container" style={{ position: "relative" }}>
          <h1>
            <Link to="/">{title}</Link>
          </h1>
          <button
            ref={addActionBtnRef}
            onClick={handleOpenActionMenu}
            style={{ zIndex: "999999" }}
          >
            <FontAwesomeIcon
              icon={faPlusCircle}
              style={{
                color: "#fff",
                fontSize: "1.5rem",
                transform: openActionMenu ? "rotate(45deg)" : "",
                transition: "transform 150ms ease",
              }}
            />
          </button>
          <div
            ref={addActionRef}
            className="card"
            style={{
              position: "absolute",
              top: "0",
              right: "0",
              backgroundColor: "#111",
              visibility: openActionMenu ? "visible" : "hidden",
              opacity: openActionMenu ? "0.9" : "0",
              transform: "translate(-12px, 12px)",
              transition: "opacity 150ms ease, visibility 150ms ease",
            }}
          >
            <h2 className="text-left">Actions</h2>
            <p>Choose an action type</p>
            <ul className="list">
              <li>
                <Link to="/add-travel" onClick={handleOpenActionMenu}>
                  Travel
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
};

Navbar.defaultProps = {
  title: "Travel Green",
};

export default Navbar;
