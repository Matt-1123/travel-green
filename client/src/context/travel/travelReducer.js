import {
  GET_TRAVEL_ACTIONS,
  GET_TRAVEL_ACTION,
  ADD_TRAVEL,
  TRAVEL_ERROR,
} from "../types";

// eslint-disable-next-line
export default (state, action) => {
  switch (action.type) {
    case GET_TRAVEL_ACTIONS:
      return {
        ...state,
        travelActions: action.payload,
        loading: false,
      };
    case GET_TRAVEL_ACTION:
      return {
        ...state,
        travelAction: action.payload,
        loading: false,
      };
    case ADD_TRAVEL:
      return {
        ...state,
        travelActions: [...state.travelActions, action.payload],
        loading: false,
      };
    case TRAVEL_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
