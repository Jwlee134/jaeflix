import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { moviesApi, tvApi } from "api";

const initialState = {
  result: null,
  recommends: null,
  casts: null,
  crews: null,
  error: null,
  loading: true,
};

export const fetchMovieDetail = createAsyncThunk(
  "detail/fetchMovieDetail",
  async (id, { rejectWithValue }) => {
    try {
      const { data: result } = await moviesApi.movieDetail(id);
      const {
        data: { results: recommends },
      } = await moviesApi.recommends(id);
      const {
        data: { cast: casts, crew: crews },
      } = await moviesApi.credits(id);
      return { result, recommends, casts, crews };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchTVDetail = createAsyncThunk(
  "detail/fetchTVDetail",
  async (id, { rejectWithValue }) => {
    try {
      const { data: result } = await tvApi.tvDetail(id);
      const {
        data: { results: recommends },
      } = await tvApi.recommends(id);
      const {
        data: { cast: casts, crew: crews },
      } = await tvApi.credits(id);
      return { result, recommends, casts, crews };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const detailSlice = createSlice({
  name: "Detail",
  initialState,
  reducers: {
    reload: (state, action) => {
      state.loading = true;
    },
  },
  extraReducers: {
    [fetchMovieDetail.fulfilled]: (state, action) => {
      const { result, recommends, casts, crews } = action.payload;
      state.loading = false;
      state.result = result;
      state.recommends = recommends;
      state.casts = casts;
      state.crews = crews;
    },
    [fetchMovieDetail.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [fetchTVDetail.fulfilled]: (state, action) => {
      const { result, recommends, casts, crews } = action.payload;
      state.loading = false;
      state.result = result;
      state.recommends = recommends;
      state.casts = casts;
      state.crews = crews;
    },
    [fetchTVDetail.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { reload } = detailSlice.actions;

export default detailSlice.reducer;
