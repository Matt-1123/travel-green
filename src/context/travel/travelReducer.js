import { ADD_TRAVEL } from "../types";

export default (state, action) => {
  switch (action.type) {
    case ADD_TRAVEL:
      return {
        ...state,
        travelActions: [...state.travelActions, action.payload],
      };
    default:
      return state;
  }
};
