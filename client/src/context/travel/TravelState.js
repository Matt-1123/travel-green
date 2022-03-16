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
    travelActions: [
      {
        user: { name: "Matt Russo" },
        id: 1,
        carbonPrevented: 10,
        title: "Morning Commute",
        description:
          "Nice day. Decided to walk instead of taking the car to work.",
        date: "January 1, 2022",
        usedTravelType: "walking",
        usedDistance: 2,
        avoidedTravelType: "driving",
        avoidedDistance: 2,
      },
      {
        user: { name: "Matt Russo" },
        id: 2,
        carbonPrevented: 124.3,
        title: "Morning Commute",
        description: "",
        date: "January 1, 2022",
        usedTravelType: "bicycling",
        usedDistance: 26.2,
        avoidedTravelType: "driving",
        avoidedDistance: 29,
      },
      {
        user: { name: "Matt Russo" },
        id: 3,
        carbonPrevented: 5.5,
        title: "Morning Commute",
        description:
          "Nice day. Decided to walk instead of taking the car to work.",
        date: "January 1, 2022",
        usedTravelType: "bicycling",
        usedDistance: 8,
        avoidedTravelType: "driving",
        avoidedDistance: 11,
      },
    ],
  };

  const [state, dispatch] = useReducer(travelReducer, initialState);

  // Add Travel Action
  const addTravel = async (travel) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("api/actions");
    } catch (err) {
      dispatch({ type: TRAVEL_ERROR });
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
