import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { moviesApi, tvApi } from "api";

const initialState = {
  movieResults: null,
  tvResults: null,
  error: null,
  loading: false,
};

export const fetchResults = createAsyncThunk(
  "search/fetchResults",
  async (term, { rejectWithValue }) => {
    try {
      const {
        data: { results: movieResults },
      } = await moviesApi.search(term);
      const {
        data: { results: tvResults },
      } = await tvApi.search(term);
      return { movieResults, tvResults };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchResults.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchResults.fulfilled]: (state, action) => {
      const { movieResults, tvResults } = action.payload;
      state.loading = false;
      state.movieResults = movieResults;
      state.tvResults = tvResults;
    },
    [fetchResults.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default searchSlice.reducer;
