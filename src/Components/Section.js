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

const Section = ({ title, children, isPeople = false }) => {
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
            1800: { slidesPerView: isPeople ? 6 : 9, slidesPerGroup: 5 },
            1600: { slidesPerView: isPeople ? 5 : 8, slidesPerGroup: 5 },
            1400: { slidesPerView: isPeople ? 5 : 7, slidesPerGroup: 5 },
            1200: {
              slidesPerView: isPeople ? 4 : 6,
              slidesPerGroup: isPeople ? 4 : 5,
            },
            1000: {
              slidesPerView: isPeople ? 3 : 5,
              slidesPerGroup: isPeople ? 3 : 5,
            },
            800: {
              slidesPerView: isPeople ? 3 : 4,
              slidesPerGroup: isPeople ? 3 : 4,
            },
            500: { slidesPerView: 3, slidesPerGroup: 3 },
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
  isPeople: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default Section;
