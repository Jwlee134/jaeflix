import React from "react";
import PropTypes from "prop-types";
import SwiperCore, { Navigation } from "swiper";
import { Swiper } from "swiper/react";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import { Container, Title } from "styles/section";

SwiperCore.use([Navigation]);

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
            1801: { slidesPerView: isCredits ? 5 : 8, slidesPerGroup: 5 },
            1601: { slidesPerView: isCredits ? 5 : 8, slidesPerGroup: 5 },
            1401: { slidesPerView: isCredits ? 5 : 8, slidesPerGroup: 5 },
            1201: {
              slidesPerView: isCredits ? 4 : 7,
              slidesPerGroup: isCredits ? 4 : 5,
            },
            1001: {
              slidesPerView: isCredits ? 4 : 7,
              slidesPerGroup: isCredits ? 4 : 5,
            },
            801: {
              slidesPerView: isCredits ? 4 : 5,
              slidesPerGroup: isCredits ? 4 : 5,
            },
            601: {
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
