import React, { useReducer } from "react";
import axios from "axios";
import TravelContext from "./travelContext";
import TravelReducer from "./travelReducer";
import {
  TRAVEL_TYPE,
  TRAVEL_USED_ORIGIN,
  TRAVEL_USED_DESTINATION,
} from "../types";

 
const TravelState = (props) => {
  const initialState = {
    travel-type: '',
    origin: '',
    destination: '',
    loading: false
  };

  const [state, dispatch] = useReducer(TravelReducer, initialState);
}
