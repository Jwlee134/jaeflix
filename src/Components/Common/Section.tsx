import React from "react";

import SwiperCore, { Navigation } from "swiper";
import { Swiper } from "swiper/react";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import { Container, Title } from "styles/section";

SwiperCore.use([Navigation]);

interface IProps {
  title: string;
  children: React.ReactNode;
  isCredits?: boolean;
}

const Section = ({ title, children, isCredits = false }: IProps) => {
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

export default Section;
