import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { RootState } from "store";

import { isMovieItem } from "types/typeGuards";

import Poster from "Components/Common/Poster";
import Section from "Components/Common/Section";

import { SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";
import styled from "styled-components";

const Container = styled.div``;

const Recommends = () => {
  const { similar } = useSelector((state: RootState) => state.detail);

  const { pathname } = useLocation();
  const isMovie = pathname.includes("movie");

  return similar && similar.length > 0 ? (
    <Container>
      <Section title={isMovie ? "관련 영화 추천" : "관련 TV 프로그램 추천"}>
        {similar.map((item, index) => (
          <SwiperSlide key={index}>
            <Poster
              id={item.id}
              imageUrl={item.poster_path}
              title={isMovieItem(item) ? item.title : item.name}
              year={isMovieItem(item) ? item.release_date : item.first_air_date}
              rating={item.vote_average}
              isMovie={isMovie ? true : false}
            />
          </SwiperSlide>
        ))}
      </Section>
    </Container>
  ) : null;
};

export default Recommends;
