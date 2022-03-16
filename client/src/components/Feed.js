import React, { Fragment, useContext, useEffect } from "react";
import TravelFeedItem from "./travel/TravelFeedItem";
import Spinner from "./layout/Spinner";
import TravelContext from "../context/travel/travelContext";

const Feed = () => {
  const travelContext = useContext(TravelContext);

  const { travelActions, getTravelActions, loading } = travelContext;

  useEffect(() => {
    getTravelActions();
    // eslint-disable-next-line
  }, []);

  if (travelActions !== null && travelActions.length === 0 && !loading) {
    return <h4>No actions to display.</h4>;
  }

  return (
    <Fragment>
      {travelActions !== null && !loading ? (
        travelActions.map((action) => (
          <TravelFeedItem key={action._id} action={action} />
        ))
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Feed;
