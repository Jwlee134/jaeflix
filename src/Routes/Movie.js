import React, { useEffect } from "react";
import "swiper/swiper.scss";
import { Helmet } from "react-helmet";
import Loader from "Components/Loader";
import MainScreen from "Components/MainScreen";
import Section from "Components/Section";
import Poster from "Components/Poster";
import Message from "Components/Message";
import { SwiperSlide } from "swiper/react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "store/movie";
import { Container } from "styles/movieTv";

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
  if (error) return <Message text={error} />;

  return (
    <>
      <Helmet>
        <title>영화 | Jaeflix</title>
      </Helmet>
      <MainScreen nowPlaying={nowPlaying} />
      <Container>
        {popular && popular.length > 0 && (
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
        )}
        {upcoming && upcoming.length > 0 && (
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
        )}
        {topRated && topRated.length > 0 && (
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
        )}
      </Container>
    </>
  );
};

export default Movie;
