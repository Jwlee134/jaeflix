import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { tvApi } from "api";
import { TV } from "types";

interface IState {
  topRated: TV[];
  airingToday: TV[];
  popular: TV[];
  loading: boolean;
  error: string | null;
}

const initialState: IState = {
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
      return rejectWithValue(
        "TV 프로그램 정보를 불러오는 데 오류가 발생했습니다."
      );
    }
  }
);

const tvSlice = createSlice({
  name: "tvSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTVs.fulfilled, (state, action) => {
        const { airingToday, topRated, popular } = action.payload;
        state.airingToday = airingToday;
        state.topRated = topRated;
        state.popular = popular;
        state.loading = false;
      })
      .addCase(fetchTVs.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
  },
});

export default tvSlice.reducer;
