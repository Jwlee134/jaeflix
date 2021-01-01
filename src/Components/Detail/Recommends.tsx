import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { RootState } from "store/reducers";

import { isMovieItem } from "types/typeGuards";

import Poster from "Components/Common/Poster";
import Section from "Components/Common/Section";

import { SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";

const Recommends = () => {
  const { recommends } = useSelector((state: RootState) => state.detail);

  const { pathname } = useLocation();
  const isMovie = pathname.includes("movie");

  return recommends && recommends.length > 0 ? (
    <Section title={isMovie ? "관련 영화 추천" : "관련 TV 프로그램 추천"}>
      {recommends.map((recommend, index) => (
        <SwiperSlide key={index}>
          <Poster
            id={recommend.id}
            imageUrl={recommend.poster_path}
            title={isMovieItem(recommend) ? recommend.title : recommend.name}
            year={
              isMovieItem(recommend)
                ? recommend.release_date
                : recommend.first_air_date
            }
            rating={recommend.vote_average}
            isMovie={isMovie ? true : false}
          />
        </SwiperSlide>
      ))}
    </Section>
  ) : null;
};

export default Recommends;
