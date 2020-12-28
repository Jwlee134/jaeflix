import { combineReducers } from "@reduxjs/toolkit";
import movies from "./movies";

const rootReducer = combineReducers({
  movies,
});

export default rootReducer;
