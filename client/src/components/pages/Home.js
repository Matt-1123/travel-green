import React, { useContext } from "react";
import Feed from "../Feed";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";

const Home = () => {
  const authContext = useContext(AuthContext);

  return (
    <div className="grid-1-3">
      <div>
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
    </div>
  );
};

export default Home;
