import { Movie, MovieDetail, TV, TVDetail } from "types";

export const isMovieDetail = (
  target: MovieDetail | TVDetail | null
): target is MovieDetail => (target as MovieDetail).title !== undefined;

export const isMovieItem = (target: Movie | TV): target is Movie =>
  (target as Movie).title !== undefined;
