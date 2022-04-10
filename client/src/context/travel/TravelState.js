import React, { useReducer } from "react";
import dateConverter from "../../utils/dateConverter";
import axios from "axios";
import TravelContext from "./travelContext";
import travelReducer from "./travelReducer";
import {
  GET_TRAVEL_ACTIONS,
  GET_TRAVEL_ACTION,
  ADD_TRAVEL,
  DELETE_TRAVEL,
  UPDATE_TRAVEL,
  TRAVEL_ERROR,
} from "../types";

const TravelState = (props) => {
  const initialState = {
    travelActions: null,
    travelAction: {},
    filtered: null,
    error: null,
  };

  const [state, dispatch] = useReducer(travelReducer, initialState);

  // Get Travel Actions
  const getTravelActions = async () => {
    try {
      const res = await axios.get("/api/actions");

      dispatch({ type: GET_TRAVEL_ACTIONS, payload: res.data });
    } catch (err) {
      dispatch({ type: TRAVEL_ERROR, payload: err.msg });
    }
  };

  // Get Travel Action
  const getTravelAction = async (id) => {
    try {
      const res = await axios.get(`/api/actions/${id}`);
      res.data.date = dateConverter(res.data.date);
      dispatch({ type: GET_TRAVEL_ACTION, payload: res.data });
    } catch (err) {
      dispatch({ type: TRAVEL_ERROR, payload: err.msg });
    }
  };

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
        travelAction: state.travelAction,
        filtered: state.filtered,
        error: state.error,
        getTravelActions,
        getTravelAction,
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
