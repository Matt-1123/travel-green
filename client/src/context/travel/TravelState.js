import React, { useReducer } from "react";
import axios from "axios";
import { v4 as uuid } from "uuid";
import TravelContext from "./travelContext";
import TravelReducer from "./travelReducer";
import { ADD_TRAVEL } from "../types";

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

  const [state, dispatch] = useReducer(TravelReducer, initialState);

  // Add Travel
  const addTravel = (travel) => {
    // Note: MongoDB adds id
    // uuid will temporarily provide the id until backend is setup
    travel.id = uuid.v4();
    dispatch({ type: ADD_TRAVEL, payload: travel });
  };

  return (
    <TravelContext.Provider
      value={{
        travelActions: state.travelActions,
        addTravel,
      }}
    >
      {props.children}
    </TravelContext.Provider>
  );
};

export default TravelState;
