import React, { Fragment, useContext } from "react";
import TravelContext from "../context/travel/travelContext";
import TravelAction from "./travel/TravelAction";

const Feed = () => {
  const travelContext = useContext(TravelContext);

  const { travelActions } = travelContext;

  if (travelActions.length === 0) {
    return <h4>No actions to display.</h4>;
  }

  return (
    <Fragment>
      {travelActions.map((action) => (
        <TravelAction key={action.id} action={action} />
      ))}
    </Fragment>
  );
};

export default Feed;
