import React from "react";
import Feed from "../Feed";

const Home = () => {
  return (
    <div className="grid-1-3">
      <div>
        <h2>Sidebar</h2>
      </div>
      <Feed />
    </div>
  );
};

export default Home;
