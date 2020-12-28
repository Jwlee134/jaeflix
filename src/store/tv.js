import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { tvApi } from "api";

const initialState = {
  topRated: [],
  airingToday: [],
  popular: [],
  loading: true,
  error: null,
};

export const fetchTVs = createAsyncThunk(
  "tv/fetchTVs",
  async (_, { rejectWithValue }) => {
    try {
      const {
        data: { results: topRated },
      } = await tvApi.topRated();
      const {
        data: { results: airingToday },
      } = await tvApi.airingToday();
      const {
        data: { results: popular },
      } = await tvApi.popular();
      return { airingToday, topRated, popular };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const tvSlice = createSlice({
  name: "tvSlice",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchTVs.fulfilled]: (state, action) => {
      const { airingToday, topRated, popular } = action.payload;
      state.airingToday = airingToday;
      state.topRated = topRated;
      state.popular = popular;
      state.loading = false;
    },
    [fetchTVs.rejected]: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export default tvSlice.reducer;
