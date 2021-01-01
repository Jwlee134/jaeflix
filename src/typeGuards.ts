import { MovieDetailItems, MovieItems, TVDetailItems, TVItems } from "types";

export const isMovieDetail = (
  target: MovieDetailItems | TVDetailItems | null
): target is MovieDetailItems => {
  return (target as MovieDetailItems).title !== undefined;
};

export const isMovieItem = (
  target: MovieItems | TVItems
): target is MovieItems => {
  return (target as MovieItems).title !== undefined;
};
