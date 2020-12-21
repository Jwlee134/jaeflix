import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import SwiperCore, { Navigation } from "swiper";
import { Swiper } from "swiper/react";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";

SwiperCore.use([Navigation]);

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
  @media screen and (max-width: 500px) {
    padding: 10px 10px;
  }
  @media screen and (max-width: 700px) {
    .swiper-button-next,
    .swiper-button-prev {
      display: none;
    }
  }
`;

const Title = styled.div`
  font-size: 20px;
  @media screen and (max-width: 500px) {
    text-align: center;
  }
`;

const Section = ({ title, children, isCredits = false }) => {
  return (
    <>
      <Title>{title}</Title>
      <Container>
        <Swiper
          spaceBetween={30}
          slidesPerView={2}
          slidesPerGroup={2}
          navigation
          breakpoints={{
            1800: { slidesPerView: isCredits ? 5 : 8, slidesPerGroup: 5 },
            1600: { slidesPerView: isCredits ? 5 : 8, slidesPerGroup: 5 },
            1400: { slidesPerView: isCredits ? 5 : 8, slidesPerGroup: 5 },
            1200: {
              slidesPerView: isCredits ? 4 : 7,
              slidesPerGroup: isCredits ? 4 : 5,
            },
            1000: {
              slidesPerView: isCredits ? 4 : 7,
              slidesPerGroup: isCredits ? 4 : 5,
            },
            800: {
              slidesPerView: isCredits ? 4 : 5,
              slidesPerGroup: isCredits ? 4 : 5,
            },
            600: {
              slidesPerView: isCredits ? 3 : 4,
              slidesPerGroup: isCredits ? 3 : 4,
            },
            401: { slidesPerView: 3, slidesPerGroup: 3 },
          }}
        >
          {children}
        </Swiper>
      </Container>
    </>
  );
};

Section.propTypes = {
  title: PropTypes.string.isRequired,
  isCredits: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default Section;
