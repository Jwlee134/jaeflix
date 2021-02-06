import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { fetchMovieDetail, fetchTVDetail } from "store/detail";

import Loader from "Components/Loader";
import Message from "Components/Message";
import DetailMain from "Components/Detail/DetailMain";
import Similar from "Components/Detail/Similar";
import Seasons from "Components/Detail/Seasons";

import styled from "styled-components";

import { Helmet } from "react-helmet";
import { isMovieDetail } from "types/typeGuards";

const Container = styled.div`
  height: 100vh;
  width: 100%;
  position: relative;
  padding: 30px;
  padding-top: 100px;
  @media screen and (max-width: 400px) {
    padding-left: 30px;
    padding-right: 30px;
  }
  span {
    line-height: 1.2;
  }
`;

const Backdrop = styled.div<{ bgImg: string }>`
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.bgImg});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: -1;
`;

const Detail = () => {
  const { pathname } = useLocation();
  const { id } = useParams<{ id: string }>();
  const parsedId = parseInt(id);

  const isMovie = pathname.includes("movie");

  const { result, loading, error } = useSelector(
    (state: RootState) => state.detail
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(isMovie ? fetchMovieDetail(parsedId) : fetchTVDetail(parsedId));
  }, [dispatch, parsedId, isMovie]);

  if (loading) return <Loader />;
  if (error) return <Message text={error} />;
  return (
    <Container>
      <Helmet>
        (
        <title>{`${
          isMovieDetail(result) ? result.title : result?.name
        } | Jaeflix`}</title>
        )
      </Helmet>
      <Backdrop
        bgImg={`https://image.tmdb.org/t/p/original${result!.backdrop_path}`}
      />
      <DetailMain result={result} />
      <Similar />
      {!isMovie && <Seasons />}
    </Container>
  );
};

export default Detail;
