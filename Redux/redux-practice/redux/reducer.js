import {
  INCREMENT,
  DECREMENT,
  INCREMENTBY2,
  DECREMENTBY2,
} from "./actionTypes.js";

const initialState = 0;

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      return state + 1;

    case DECREMENT:
      return state - 1;

    case INCREMENTBY2:
      return state + 2;

    case DECREMENTBY2:
      return state - 2;

    default:
      return state;
  }
};

export default counterReducer;
