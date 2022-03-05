import React from "react";

const NotFound = () => {
  return (
    <div className="container" style={styles.container}>
      <h1>Not Found</h1>
      <p>The page you are looking for does not exist...</p>
    </div>
  );
};

const styles = {
  container: {
    height: "400px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
};

export default NotFound;
