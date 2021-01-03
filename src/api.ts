import axios from "axios";
import { MoviesApi, TVApi } from "types";
require("dotenv").config();

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: process.env.REACT_APP_API_KEY,
    language: "ko-KR",
  },
});

export const tvApi: TVApi = {
  topRated: () => api.get("tv/top_rated"),
  popular: () => api.get("tv/popular"),
  airingToday: () => api.get("tv/airing_today"),
  tvDetail: (id: number) =>
    api.get(`tv/${id}`, {
      params: {
        append_to_response: "videos",
      },
    }),
  search: (term: string) =>
    api.get("search/tv", {
      params: {
        query: term,
      },
    }),
  similar: (id: number) => api.get(`tv/${id}/similar`),
  credits: (id: number) => api.get(`tv/${id}/credits`),
};

export const moviesApi: MoviesApi = {
  nowPlaying: () => api.get("movie/now_playing"),
  topRated: () => api.get("movie/top_rated"),
  upcoming: () => api.get("movie/upcoming"),
  popular: () => api.get("movie/popular"),
  movieDetail: (id: number) =>
    api.get(`movie/${id}`, {
      params: {
        append_to_response: "videos",
      },
    }),
  search: (term: string) =>
    api.get("search/movie", {
      params: {
        query: term,
      },
    }),
  similar: (id: number) => api.get(`movie/${id}/similar`),
  credits: (id: number) => api.get(`movie/${id}/credits`),
};
