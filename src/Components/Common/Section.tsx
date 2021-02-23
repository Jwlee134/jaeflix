import React from "react";

import SwiperCore, { Navigation } from "swiper";
import { Swiper } from "swiper/react";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import styled, { css } from "styled-components";

const Container = styled.div<{ isCredits: boolean }>`
  padding-bottom: 30px;
  .swiper-wrapper {
    margin-top: 20px;
  }
  .swiper-button-next,
  .swiper-button-prev {
    color: rgba(255, 255, 255, 0.8);
  }
  .swiper-button-disabled {
    opacity: 0;
  }
  @media screen and (max-width: 1024px) {
    .swiper-button-next,
    .swiper-button-prev {
      display: none;
    }
  }
  .swiper-slide {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  ${({ isCredits }) =>
    isCredits &&
    css`
      @media screen and (max-width: 479px) {
        padding-bottom: 0;
      }
    `}
`;

const Title = styled.div`
  font-size: 20px;
  @media screen and (max-width: 767px) {
    text-align: center;
  }
`;

SwiperCore.use([Navigation]);

interface IProps {
  title: string;
  children: React.ReactNode;
  isCredits?: boolean;
}

const Section = ({ title, children, isCredits = false }: IProps) => (
  <>
    <Title>{title}</Title>
    <Container isCredits={isCredits}>
      <Swiper
        spaceBetween={30}
        slidesPerView={2}
        slidesPerGroup={2}
        navigation
        breakpoints={{
          1601: {
            slidesPerView: isCredits ? 5 : 8,
            slidesPerGroup: 5,
          },
          1401: {
            slidesPerView: isCredits ? 4 : 7,
            slidesPerGroup: isCredits ? 4 : 5,
          },
          1281: {
            slidesPerView: isCredits ? 4 : 6,
            slidesPerGroup: isCredits ? 4 : 5,
          },
          1025: {
            slidesPerView: isCredits ? 3 : 5,
            slidesPerGroup: isCredits ? 3 : 5,
          },
          840: {
            slidesPerView: 4,
            slidesPerGroup: 4,
          },
          650: { slidesPerView: 3, slidesPerGroup: 3 },
        }}
      >
        {children}
      </Swiper>
    </Container>
  </>
);

export default Section;
