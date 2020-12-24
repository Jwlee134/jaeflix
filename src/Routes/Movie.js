import { moviesApi } from "api";
import React, { useEffect, useState } from "react";
import "swiper/swiper.scss";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import Loader from "Components/Loader";
import MainScreen from "Components/MainScreen";
import Section from "Components/Section";
import Poster from "Components/Poster";
import Message from "Components/Message";
import { SwiperSlide } from "swiper/react";

const Container = styled.div`
  margin-top: 80px;
  padding: 0px 20px;
`;

const Movie = () => {
  const [movie, setMovie] = useState({
    nowPlaying: [],
    topRated: [],
    upcoming: [],
    popular: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMovies = async () => {
    try {
      const {
        data: { results: nowPlaying },
      } = await moviesApi.nowPlaying();
      const {
        data: { results: topRated },
      } = await moviesApi.topRated();
      const {
        data: { results: upcoming },
      } = await moviesApi.upcoming();
      const {
        data: { results: popular },
      } = await moviesApi.popular();
      setMovie({
        topRated,
        upcoming,
        popular,
        nowPlaying,
      });
    } catch (error) {
      setError("페이지 정보를 찾을 수 없습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <>
      <Helmet>
        <title>영화 | Jaeflix</title>
      </Helmet>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MainScreen nowPlaying={movie.nowPlaying} />
          <Container>
            {movie.popular && movie.popular.length > 0 && (
              <Section title="인기">
                {movie.popular.map((movie) => (
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
            {movie.upcoming && movie.upcoming.length > 0 && (
              <Section title="상영 예정">
                {movie.upcoming.map((movie) => (
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
            {movie.topRated && movie.topRated.length > 0 && (
              <Section title="최고 평점">
                {movie.topRated.map((movie) => (
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
