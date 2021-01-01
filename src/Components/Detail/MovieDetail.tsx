import React, { useEffect } from "react";
import { Helmet } from "react-helmet";

import { useDispatch, useSelector } from "react-redux";
import { fetchMovieDetail } from "store/detail";
import { RootState } from "store/reducers";

import { isMovieDetail } from "types/typeGuards";

import Recommends from "./Recommends";
import DetailInfo from "Components/Detail/DetailInfo";
import Loader from "Components/Common/Loader";
import Message from "Components/Common/Message";

import { Backdrop, Container } from "styles/detail";

interface IProps {
  id: number;
}

const MovieDetail = ({ id }: IProps) => {
  const { result, loading, error } = useSelector(
    (state: RootState) => state.detail
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMovieDetail(id));
  }, [dispatch, id]);

  if (loading) return <Loader />;
  if (error) return <Message text={error} />;

  return (
    <Container>
      <Helmet>
        (<title>{isMovieDetail(result) && result.title} | Jaeflix</title>)
      </Helmet>
      <Backdrop
        bgImg={`https://image.tmdb.org/t/p/original${result!.backdrop_path}`}
      />
      <DetailInfo result={result} />
      <Recommends />
    </Container>
  );
};

export default MovieDetail;
