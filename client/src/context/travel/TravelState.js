import React, { useReducer } from "react";
import axios from "axios";
import TravelContext from "./travelContext";
import travelReducer from "./travelReducer";
import {
  ADD_TRAVEL,
  DELETE_TRAVEL,
  UPDATE_TRAVEL,
  TRAVEL_ERROR,
} from "../types";

const TravelState = (props) => {
  const initialState = {
    travelActions: [],
    current: null,
    filtered: null,
    error: null,
  };

  const [state, dispatch] = useReducer(travelReducer, initialState);

  // Add Travel Action
  const addTravel = async (travelAction) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/actions", travelAction, config);

      dispatch({ type: ADD_TRAVEL, payload: res.data });
    } catch (err) {
      dispatch({ type: TRAVEL_ERROR, payload: err.msg });
    }
  };

  // Update Travel Action
  const updateTravel = async (travel) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("api/actions/");
    } catch (err) {
      dispatch({ type: TRAVEL_ERROR });
    }
  };

  // Delete Travel action
  const deleteTravel = async (travel) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("api/actions/");
    } catch (err) {
      dispatch({ type: TRAVEL_ERROR });
    }
  };

  return (
    <TravelContext.Provider
      value={{
        travelActions: state.travelActions,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        addTravel,
        updateTravel,
        deleteTravel,
      }}
    >
      {props.children}
    </TravelContext.Provider>
  );
};

export default TravelState;
