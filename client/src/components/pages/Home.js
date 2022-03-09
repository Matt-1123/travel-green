import React, { useContext } from "react";
import Feed from "../Feed";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";

const Home = () => {
  const authContext = useContext(AuthContext);

  return (
    <div className="grid-2-5-2" style={{ alignItems: "start" }}>
      <div className="card bg-dark">
        <h2 className="text-left">Actions</h2>
        <p>Choose an action type</p>
        <ul className="list">
          <li>
            <Link to="/add-travel">Travel</Link>
          </li>
        </ul>
      </div>
      <div>
        <Feed />
      </div>
      <div>
        <div className="container">
          <h2 className="text-left">Learn More</h2>
          <hr />
          <ul className="list">
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
