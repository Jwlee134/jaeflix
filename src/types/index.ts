import { AxiosResponse } from "axios";

export interface CategoryItems<T> {
  page: number;
  results: T[];
}

export interface Genres {
  id: number;
  name: string;
}

export interface ProductionCountries {
  id: number;
  name: string;
}

export interface ProductionCompaines {
  id: number;
  logo_path: string;
  name: string;
}

export interface CommonItems {
  id: number;
  backdrop_path: string;
  overview: string;
  poster_path: string;
  vote_average: number;
  imdbId: number;
}

export interface Videos {
  id: string;
  name: string;
  key: string;
}

export interface Season {
  poster_path: string;
  name: string;
  id: number;
  air_date: string | null;
}

export interface MovieItems extends CommonItems {
  original_title: string;
  release_date: string;
  title: string;
  runtime: number;
}

export interface TVItems extends CommonItems {
  original_name: string;
  first_air_date: string;
  name: string;
  episode_run_time: number;
}

export interface MovieDetailItems extends MovieItems {
  genres: Genres[];
  production_countries: ProductionCountries[];
  production_companies: ProductionCompaines[];
  videos?: {
    results?: Videos[];
  };
}

export interface TVDetailItems extends TVItems {
  genres: Genres[];
  production_countries: ProductionCountries[];
  production_companies: ProductionCompaines[];
  seasons: Season[];
  videos?: {
    results?: Videos[];
  };
}

export interface CommonCredits {
  id: number;
  known_for_department: string;
  name: string;
  profile_path: string;
}

export interface Cast extends CommonCredits {
  character: string;
}

export interface Crew extends CommonCredits {
  department: string;
}

export interface Credits {
  id: number;
  cast: Cast[];
  crew: Crew[];
}

export interface MoviesApi {
  nowPlaying: () => Promise<AxiosResponse<CategoryItems<MovieItems>>>;
  topRated: () => Promise<AxiosResponse<CategoryItems<MovieItems>>>;
  upcoming: () => Promise<AxiosResponse<CategoryItems<MovieItems>>>;
  popular: () => Promise<AxiosResponse<CategoryItems<MovieItems>>>;
  movieDetail: (id: number) => Promise<AxiosResponse<MovieDetailItems>>;
  search: (term: string) => Promise<AxiosResponse<CategoryItems<MovieItems>>>;
  similar: (id: number) => Promise<AxiosResponse<CategoryItems<MovieItems>>>;
  credits: (id: number) => Promise<AxiosResponse<Credits>>;
}

export interface TVApi {
  airingToday: () => Promise<AxiosResponse<CategoryItems<TVItems>>>;
  topRated: () => Promise<AxiosResponse<CategoryItems<TVItems>>>;
  popular: () => Promise<AxiosResponse<CategoryItems<TVItems>>>;
  tvDetail: (id: number) => Promise<AxiosResponse<TVDetailItems>>;
  search: (term: string) => Promise<AxiosResponse<CategoryItems<TVItems>>>;
  similar: (id: number) => Promise<AxiosResponse<CategoryItems<TVItems>>>;
  credits: (id: number) => Promise<AxiosResponse<Credits>>;
}
