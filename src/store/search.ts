import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { moviesApi, tvApi } from "api";
import { MovieItems, TVItems } from "types";

interface IState {
  movieResults: MovieItems[] | null;
  tvResults: TVItems[] | null;
  error: string | null;
  loading: boolean;
}

const initialState: IState = {
  movieResults: null,
  tvResults: null,
  error: null,
  loading: false,
};

export const fetchResults = createAsyncThunk(
  "search/fetchResults",
  async (term: string, { rejectWithValue }) => {
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchResults.pending, (state, action) => {
        state.loading = true;
      })

      .addCase(fetchResults.fulfilled, (state, action) => {
        const { movieResults, tvResults } = action.payload;
        state.loading = false;
        state.movieResults = movieResults;
        state.tvResults = tvResults;
      })
      .addCase(fetchResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default searchSlice.reducer;
