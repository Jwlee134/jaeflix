import React from "react";
import { useLocation, useParams } from "react-router-dom";

import MovieDetail from "Components/Detail/MovieDetail";
import TVDetail from "Components/Detail/TVDetail";

const Detail = () => {
  const { pathname } = useLocation();
  const { id } = useParams<{ id: string }>();

  const parsedId = parseInt(id);

  const isMovie = pathname.includes("movie");

  if (isMovie) {
    return <MovieDetail id={parsedId} />;
  } else {
    return <TVDetail id={parsedId} />;
  }
};

export default Detail;
