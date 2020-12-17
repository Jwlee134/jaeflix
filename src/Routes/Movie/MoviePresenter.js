import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Section from "Components/Section";
import Loader from "Components/Loader";
import Message from "Components/Message";
import Poster from "Components/Poster";
import { Helmet } from "react-helmet";
import { SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";

const Container = styled.div`
  margin-top: 80px;
  padding: 0px 20px;
`;

const MoviePresenter = ({ topRated, upcoming, popular, error, loading }) => (
  <>
    <Helmet>
      <title>영화 | Jaeflix</title>
    </Helmet>
    {loading ? (
      <Loader />
    ) : (
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
    )}
  </>
);

MoviePresenter.propTypes = {
  topRated: PropTypes.array,
  upcoming: PropTypes.array,
  popular: PropTypes.array,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};

export default MoviePresenter;
