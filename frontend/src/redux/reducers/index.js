// src/redux/reducers/index.js
import { combineReducers } from "redux";
// Import your other reducers here
import authReducer from "./authReducer";

const rootReducer = combineReducers({
  auth: authReducer, // Add your reducer here
});

export default rootReducer;
