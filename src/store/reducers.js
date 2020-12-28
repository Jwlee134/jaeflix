import { combineReducers } from "@reduxjs/toolkit";
import movies from "./movie";
import tvs from "./tv";
import search from "./search";
import detail from "./detail";

const rootReducer = combineReducers({
  movies,
  tvs,
  search,
  detail,
});

export default rootReducer;
