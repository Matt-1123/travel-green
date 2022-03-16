import { ADD_TRAVEL, TRAVEL_ERROR } from "../types";

export default (state, action) => {
  switch (action.type) {
    case ADD_TRAVEL:
      return {
        ...state,
        travelActions: [...state.travelActions, action.payload],
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
