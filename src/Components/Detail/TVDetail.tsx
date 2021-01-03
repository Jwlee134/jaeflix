import React, { useEffect } from "react";
import { Helmet } from "react-helmet";

import { useDispatch, useSelector } from "react-redux";
import { fetchTVDetail } from "store/detail";
import { RootState } from "store/reducers";

import { isMovieDetail } from "types/typeGuards";

import Similar from "./Similar";
import DetailInfo from "Components/Detail/DetailInfo";
import Loader from "Components/Common/Loader";
import Message from "Components/Common/Message";
import Seasons from "./Seasons";

import { Backdrop, Container } from "styles/detail";

interface IProps {
  id: number;
}

const TVDetail = ({ id }: IProps) => {
  const { result, loading, error } = useSelector(
    (state: RootState) => state.detail
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTVDetail(id));
  }, [dispatch, id]);

  if (loading) return <Loader />;
  if (error) return <Message text={error} />;
  return (
    <Container>
      <Helmet>
        (<title>{!isMovieDetail(result) && result!.name} | Jaeflix</title>)
      </Helmet>
      <Backdrop
        bgImg={`https://image.tmdb.org/t/p/original${result!.backdrop_path}`}
      />
      <DetailInfo result={result} />
      <Similar />
      <Seasons />
    </Container>
  );
};

export default TVDetail;
