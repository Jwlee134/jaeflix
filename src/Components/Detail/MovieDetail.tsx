import React, { useEffect } from "react";
import { Helmet } from "react-helmet";

import { useDispatch, useSelector } from "react-redux";
import { fetchMovieDetail } from "store/detail";
import { RootState } from "store/reducers";

import { isMovieDetail } from "types/typeGuards";

import Similar from "./Similar";
import DetailInfo from "Components/Detail/DetailInfo";
import Loader from "Components/Loader";
import Message from "Components/Message";

import styled from "styled-components";

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
        bgImg={`https://image.tmdb.org/t/p/w1280${result!.backdrop_path}`}
      />
      <DetailInfo result={result} />
      <Similar />
    </Container>
  );
};

export default MovieDetail;
