import React, { useEffect } from "react";
import { Helmet } from "react-helmet";

import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "store/movie";

import Loader from "Components/Loader";
import MainScreen from "Components/MainScreen";
import Section from "Components/Common/Section";
import Poster from "Components/Common/Poster";
import Message from "Components/Message";

import { SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";

import styled from "styled-components";
import { RootState } from "store";
import useImagePreload from "hooks/useImagePreload";

const Container = styled.div`
  margin-top: 80px;
  padding: 0px 20px;
`;

const Movie = () => {
  const {
    nowPlaying,
    topRated,
    popular,
    upcoming,
    error,
    loading,
  } = useSelector((state: RootState) => state.movies);
  const dispatch = useDispatch();

  const { imageLoaded } = useImagePreload(nowPlaying);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  if (loading || !imageLoaded) return <Loader />;
  if (error) return <Message text={error} />;

  return (
    <>
      <Helmet>
        <title>영화 | Jaeflix</title>
      </Helmet>
      <MainScreen nowPlaying={nowPlaying} />
      <Container>
        <Section title="인기">
          {popular.map((movie, index) => (
            <SwiperSlide key={index}>
              <Poster
                id={movie.id}
                imageUrl={movie.poster_path}
                title={movie.title}
                year={movie.release_date}
                rating={movie.vote_average}
                isMovie={true}
              />
            </SwiperSlide>
          ))}
        </Section>
        <Section title="상영 예정">
          {upcoming.map((movie, index) => (
            <SwiperSlide key={index}>
              <Poster
                id={movie.id}
                imageUrl={movie.poster_path}
                title={movie.title}
                year={movie.release_date}
                rating={movie.vote_average}
                isMovie={true}
              />
            </SwiperSlide>
          ))}
        </Section>
        <Section title="최고 평점">
          {topRated.map((movie, index) => (
            <SwiperSlide key={index}>
              <Poster
                id={movie.id}
                imageUrl={movie.poster_path}
                title={movie.title}
                year={movie.release_date}
                rating={movie.vote_average}
                isMovie={true}
              />
            </SwiperSlide>
          ))}
        </Section>
      </Container>
    </>
  );
};

export default Movie;
