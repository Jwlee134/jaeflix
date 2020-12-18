import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import SwiperCore, { Navigation, Thumbs } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";

SwiperCore.use([Navigation, Thumbs]);

const Container = styled.div`
  height: 100vh;
  position: relative;
  .swiper-container-thumbs {
    .swiper-slide {
      cursor: pointer;
    }
    .swiper-slide-thumb-active {
      border: 2px solid white;
      border-radius: 5px;
      cursor: pointer;
    }
  }
  .swiper-button-next,
  .swiper-button-prev {
    color: rgba(255, 255, 255, 0.8);
  }
  .swiper-button-disabled {
    opacity: 0;
  }
`;

const ThumbsContainer = styled.div`
  position: absolute;
  width: 100%;
  bottom: 0;
  margin-bottom: 10px;
  padding: 0px 10px;
`;

const Item = styled.div`
  position: relative;
`;

const Title = styled.div`
  position: absolute;
  bottom: 0;
  height: 20%;
  font-size: 18px;
  display: flex;
  align-items: center;
  margin: 10px;
  text-shadow: 0px 0px 3px rgba(0, 0, 0, 1);
  line-height: 1.3;
`;

const SectionTitle = styled.div`
  font-size: 50px;
  display: flex;
  align-items: center;
  margin-left: 80px;
  font-weight: 600;
  text-shadow: 0px 0px 5px rgba(0, 0, 0, 1);
`;

const BackDrop = styled.div`
  border-radius: 5px;
  background-image: url(${(props) => props.bgUrl});
  background-position: center center;
  background-size: cover;
  width: 100%;
  height: ${(props) => (props.thumb ? "20vh" : "100vh")};
  z-index: -1;
  padding-top: 100px;
`;

const MainScreen = ({ nowPlaying }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <Container>
      {console.log(nowPlaying)}
      <Swiper navigation thumbs={{ swiper: thumbsSwiper }} loop={true}>
        {nowPlaying.map((movie, index) => (
          <SwiperSlide key={index}>
            <Item>
              <BackDrop
                thumb={false}
                bgUrl={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              >
                <SectionTitle>현재 상영중</SectionTitle>
              </BackDrop>
            </Item>
          </SwiperSlide>
        ))}
      </Swiper>
      <ThumbsContainer>
        <Swiper
          onSwiper={setThumbsSwiper}
          watchSlidesVisibility
          watchSlidesProgress
          slidesPerView={5}
          spaceBetween={10}
          loop={true}
        >
          {nowPlaying.map((movie, index) => (
            <SwiperSlide key={index}>
              <Item>
                <BackDrop
                  thumb={true}
                  bgUrl={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                ></BackDrop>
                <Title>{movie.title}</Title>
              </Item>
            </SwiperSlide>
          ))}
        </Swiper>
      </ThumbsContainer>
    </Container>
  );
};

MainScreen.propTypes = {
  nowPlaying: PropTypes.array,
};

export default MainScreen;
