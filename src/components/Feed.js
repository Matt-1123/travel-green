import React, { Fragment, useContext } from "react";
import TravelContext from "../context/travel/travelContext";

const Feed = () => {
  const travelContext = useContext(TravelContext);

  const { travelActions } = travelContext;

  return (
    <Fragment>
      {/* {travelActions.map((travel) => (
        <Fragment>
          <h2>{travel.title}</h2>
          <p>{travel.description}</p>
        </Fragment>
      ))} */}
      {travelActions.map((action) => (
        <p>action.title</p>
      ))}
    </Fragment>
  );
};

export default Feed;
