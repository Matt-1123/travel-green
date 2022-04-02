import React, { Fragment, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import TravelContext from "../../context/travel/travelContext";

const TravelAction = () => {
  const { state } = useLocation();
  const { id } = state;

  console.log(id);

  const travelContext = useContext(TravelContext);
  const { travelAction, getTravelAction, loading } = travelContext;

  useEffect(() => {
    const getData = async (id) => {
      getTravelAction(id);
    };
    const data = getData(id);
    console.log(data);
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <h1>Title</h1>
      <p className="btn btn-dark btn-sm">Edit</p>
      <p className="btn btn-danger btn-sm">Delete</p>
    </Fragment>
  );
};

export default TravelAction;
