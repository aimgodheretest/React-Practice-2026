import { createStore } from "redux";
import counterReducer from "./redux/reducer.js";

import {
  INCREMENT,
  DECREMENT,
  INCREMENTBY2,
  DECREMENTBY2,
} from "./redux/actionTypes.js";

// Create Redux Store
const store = createStore(counterReducer);

// Subscribe to store changes
store.subscribe(() => {
  console.log("Counter Value:", store.getState());
});

// Dispatch actions
store.dispatch({ type: INCREMENT });
store.dispatch({ type: INCREMENT });
store.dispatch({ type: INCREMENTBY2 });
store.dispatch({ type: DECREMENT });
store.dispatch({ type: DECREMENTBY2 });
