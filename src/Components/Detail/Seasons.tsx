import React from "react";
import { useSelector } from "react-redux";

import { RootState } from "store";

import { isMovieDetail } from "types/typeGuards";

import Section from "Components/Common/Section";
import Poster from "Components/Common/Poster";

import { SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";

const Seasons = () => {
  const { result } = useSelector((state: RootState) => state.detail);

  return (
    <Section title="시즌 정보">
      {!isMovieDetail(result) &&
        result!.seasons.map((season, index) => (
          <SwiperSlide key={index}>
            <Poster
              id={season.id}
              imageUrl={season.poster_path}
              title={season.name}
              year={season.air_date?.substring(0, 4)}
              isCredits={true}
            />
          </SwiperSlide>
        ))}
    </Section>
  );
};

export default Seasons;
