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
import MainScreen from "Components/MainScreen";

const Container = styled.div`
  margin-top: 80px;
  padding: 0px 20px;
`;

const TVPresenter = ({ topRated, airingToday, popular, error, loading }) => (
  <>
    <Helmet>
      <title>TV | Jaeflix</title>
    </Helmet>
    {loading ? (
      <Loader />
    ) : (
      <>
        <MainScreen nowPlaying={airingToday} isShow={true} />
        <Container>
          {popular && popular.length > 0 && (
            <Section title="인기">
              {popular.map((show) => (
                <SwiperSlide key={show.id}>
                  <Poster
                    id={show.id}
                    imageUrl={show.poster_path}
                    title={show.name}
                    rating={show.vote_average}
                    year={show.first_air_date}
                  />
                </SwiperSlide>
              ))}
            </Section>
          )}
          {topRated && topRated.length > 0 && (
            <Section title="최고 평점">
              {topRated.map((show) => (
                <SwiperSlide key={show.id}>
                  <Poster
                    id={show.id}
                    imageUrl={show.poster_path}
                    title={show.name}
                    rating={show.vote_average}
                    year={show.first_air_date}
                  />
                </SwiperSlide>
              ))}
            </Section>
          )}
          {error && <Message text={error} />}
        </Container>
      </>
    )}
    ;
  </>
);

TVPresenter.propTypes = {
  topRated: PropTypes.array,
  airingToday: PropTypes.array,
  popular: PropTypes.array,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};

export default TVPresenter;
