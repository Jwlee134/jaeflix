import React, { useEffect } from "react";
import "swiper/swiper.scss";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import Loader from "Components/Loader";
import MainScreen from "Components/MainScreen";
import Section from "Components/Section";
import Poster from "Components/Poster";
import Message from "Components/Message";
import { SwiperSlide } from "swiper/react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "store/movies";

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
  } = useSelector((state) => state.movies);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  if (loading) return <Loader />;

  return (
    <>
      <Helmet>
        <title>영화 | Jaeflix</title>
      </Helmet>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MainScreen nowPlaying={nowPlaying} />
          <Container>
            {popular && popular.length > 0 && (
              <Section title="인기">
                {popular.map((movie) => (
                  <SwiperSlide key={movie.id}>
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
            )}
            {upcoming && upcoming.length > 0 && (
              <Section title="상영 예정">
                {upcoming.map((movie) => (
                  <SwiperSlide key={movie.id}>
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
            )}
            {topRated && topRated.length > 0 && (
              <Section title="최고 평점">
                {topRated.map((movie) => (
                  <SwiperSlide key={movie.id}>
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
            )}
            {error && <Message text={error} />}
          </Container>
        </>
      )}
    </>
  );
};

export default Movie;
