import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <ul>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
