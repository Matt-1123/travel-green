import React, { useContext } from "react";
import Feed from "../Feed";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";

const Home = () => {
  const authContext = useContext(AuthContext);

  return (
    <div className="grid-2-5-2 my-2" style={{ alignItems: "start" }}>
      <div className="container">
        <h2 className="text-left">Actions</h2>
        <hr />
        <p className="mt-1" style={{ lineHeight: "1.125" }}>
          Choose an action type:
        </p>
        <ul className="list">
          <li>
            <Link to="/add-travel">Travel</Link>
          </li>
        </ul>
      </div>

      <div>
        <Feed />
      </div>

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
  );
};

export default Home;
