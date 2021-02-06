import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { moviesApi, tvApi } from "api";
import { Cast, Crew, Movie, MovieDetail, TV, TVDetail } from "types";

interface IState {
  result: MovieDetail | TVDetail | null;
  similar: (Movie | TV)[];
  casts: Cast[];
  crews: Crew[];
  error: string | null;
  loading: boolean;
}

const initialState: IState = {
  result: null,
  similar: [],
  casts: [],
  crews: [],
  error: null,
  loading: true,
};

export const fetchMovieDetail = createAsyncThunk(
  "detail/fetchMovieDetail",
  async (id: number, { rejectWithValue }) => {
    try {
      const { data: result } = await moviesApi.movieDetail(id);
      const {
        data: { results: similar },
      } = await moviesApi.similar(id);
      const {
        data: { cast: casts, crew: crews },
      } = await moviesApi.credits(id);
      return { result, similar, casts, crews };
    } catch (error) {
      return rejectWithValue("상세 정보를 불러오는 데 오류가 발생했습니다.");
    }
  }
);

export const fetchTVDetail = createAsyncThunk(
  "detail/fetchTVDetail",
  async (id: number, { rejectWithValue }) => {
    try {
      const { data: result } = await tvApi.tvDetail(id);
      const {
        data: { results: similar },
      } = await tvApi.similar(id);
      const {
        data: { cast: casts, crew: crews },
      } = await tvApi.credits(id);
      return { result, similar, casts, crews };
    } catch (error) {
      return rejectWithValue("상세 정보를 불러오는 데 오류가 발생했습니다.");
    }
  }
);

const detailSlice = createSlice({
  name: "Detail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieDetail.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchMovieDetail.fulfilled, (state, action) => {
        const { result, similar, casts, crews } = action.payload;
        state.loading = false;
        state.result = result;
        state.similar = similar;
        state.casts = casts;
        state.crews = crews;
      })
      .addCase(fetchMovieDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchTVDetail.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchTVDetail.fulfilled, (state, action) => {
        const { result, similar, casts, crews } = action.payload;
        state.loading = false;
        state.result = result;
        state.similar = similar;
        state.casts = casts;
        state.crews = crews;
      })
      .addCase(fetchTVDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default detailSlice.reducer;
