import React, { useEffect } from "react";
import { Helmet } from "react-helmet";

import { useDispatch, useSelector } from "react-redux";
import { fetchTVs } from "store/tv";
import { RootState } from "store";

import Poster from "Components/Common/Poster";
import Message from "Components/Message";
import Loader from "Components/Loader";
import MainScreen from "Components/MainScreen";
import Section from "Components/Common/Section";

import { SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";

import styled from "styled-components";
import useImagePreload from "hooks/useImagePreload";

const Container = styled.div`
  margin-top: 80px;
  padding: 0px 20px;
`;

const TV = () => {
  const { airingToday, topRated, popular, error, loading } = useSelector(
    (state: RootState) => state.tvs
  );
  const dispatch = useDispatch();

  const { imageLoaded } = useImagePreload(airingToday);

  useEffect(() => {
    dispatch(fetchTVs());
  }, [dispatch]);

  if (loading || !imageLoaded) return <Loader />;
  if (error) return <Message text={error} />;

  return (
    <>
      <Helmet>
        (<title>TV | Jaeflix</title>)
      </Helmet>
      <MainScreen nowPlaying={airingToday} isShow={true} />
      <Container>
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
      </Container>
    </>
  );
};

export default TV;
