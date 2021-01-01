import React, { useEffect } from "react";
import { Helmet } from "react-helmet";

import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "store/movie";
import { Container } from "styles/movieTv";
import { RootState } from "store/reducers";

import Loader from "Components/Common/Loader";
import MainScreen from "Components/MainScreen";
import Section from "Components/Common/Section";
import Poster from "Components/Common/Poster";
import Message from "Components/Common/Message";

import { SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";

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

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  if (loading) return <Loader />;
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
