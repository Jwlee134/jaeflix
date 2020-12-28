import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { moviesApi } from "api";

const initialState = {
  nowPlaying: [],
  topRated: [],
  upcoming: [],
  popular: [],
  loading: false,
  error: null,
};

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (_, rejectWithValue) => {
    try {
      const {
        data: { results: nowPlaying },
      } = await moviesApi.nowPlaying();
      const {
        data: { results: topRated },
      } = await moviesApi.topRated();
      const {
        data: { results: popular },
      } = await moviesApi.popular();
      const {
        data: { results: upcoming },
      } = await moviesApi.upcoming();
      return { nowPlaying, topRated, popular, upcoming };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchMovies.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchMovies.fulfilled]: (state, action) => {
      const { nowPlaying, topRated, popular, upcoming } = action.payload;
      state.nowPlaying = nowPlaying;
      state.topRated = topRated;
      state.popular = popular;
      state.upcoming = upcoming;
      state.loading = false;
    },
  },
});

export default movieSlice.reducer;
