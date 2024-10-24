import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import rootReducer from "./reducers"; // Adjust the path as needed

const store = createStore(
  rootReducer,
  applyMiddleware(thunk) // Only using applyMiddleware
);

export default store;
