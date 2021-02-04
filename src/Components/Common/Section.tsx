import React from "react";

import SwiperCore, { Navigation } from "swiper";
import { Swiper } from "swiper/react";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import styled from "styled-components";

const Container = styled.div`
  padding: 0px 30px;
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
  @media screen and (max-width: 767px) {
    .swiper-button-next,
    .swiper-button-prev {
      display: none;
    }
  }
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
    <Container>
      <Swiper
        spaceBetween={30}
        slidesPerView={2}
        slidesPerGroup={2}
        navigation
        breakpoints={{
          1601: {
            slidesPerView: isCredits ? 5 : 8,
            slidesPerGroup: 5,
            autoHeight: true,
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
          768: {
            slidesPerView: 4,
            slidesPerGroup: 4,
          },
          550: { slidesPerView: 3, slidesPerGroup: 3, height: 400 },
        }}
      >
        {children}
      </Swiper>
    </Container>
  </>
);

export default Section;
