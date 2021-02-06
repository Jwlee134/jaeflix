import { configureStore } from "@reduxjs/toolkit";
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

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({ reducer: rootReducer });

export default store;
