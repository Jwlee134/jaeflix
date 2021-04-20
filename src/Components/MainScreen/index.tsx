import React, { useState } from "react";

import SwiperCore, { Navigation, Thumbs } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";

import { Movie, TV } from "types";

import styled from "styled-components";
import MainCatalog, {
  ContentData,
  ContentTitle,
  FirstColumn,
  GoDetail,
  SecondColumn,
  SectionData,
  SectionTitle,
} from "./MainCatalog";

export const ThumbsContainer = styled.div`
  position: absolute;
  width: 100%;
  bottom: 0;
  margin-bottom: 10px;
  padding: 0px 10px;
`;

export const Container = styled.div`
  height: calc(100vh - 50px);
  margin-top: 50px;
  position: relative;
  text-shadow: 0px 0px 4px rgba(0, 0, 0, 1);
  .swiper-container-thumbs {
    .swiper-slide {
      cursor: pointer;
    }
    .swiper-slide-thumb-active {
      box-shadow: inset 0px 0px 0px 2px white;
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
  @media screen and (max-width: 1400px) {
    ${SecondColumn} {
      font-size: 20px;
    }
  }
  @media screen and (max-width: 1200px) {
    ${SecondColumn} {
      font-size: 16px;
    }
    ${SectionData} {
      padding: 0;
    }
  }
  @media screen and (max-width: 750px) {
    ${FirstColumn} {
      width: 100%;
    }
    ${SecondColumn} {
      width: 0%;
      display: none;
    }
    ${ContentTitle} {
      font-size: 30px;
    }
    ${ContentData} {
      font-size: 20px;
    }
    ${GoDetail} {
      font-size: 20px;
    }
  }
  @media screen and (max-width: 600px) {
    ${SectionTitle} {
      justify-content: center;
    }
  }
  @media screen and (max-width: 450px) {
    ${SectionTitle} {
      font-size: 35px;
    }
    ${ContentTitle} {
      font-size: 25px;
    }
    ${ContentData} {
      font-weight: 400;
      font-size: 17px;
    }
    ${GoDetail} {
      font-size: 17px;
    }
  }
  @media screen and (max-width: 350px) {
    ${SectionTitle} {
      font-size: 30px;
    }
  }
`;

SwiperCore.use([Navigation, Thumbs]);

interface Props {
  nowPlaying: (Movie | TV)[];
  isShow?: boolean;
}

const MainScreen = ({ nowPlaying, isShow = false }: Props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <Container>
      <Swiper navigation thumbs={{ swiper: thumbsSwiper }} loop={true}>
        {nowPlaying.map((content, index: number) => (
          <SwiperSlide key={index}>
            <MainCatalog content={content} isShow={isShow} />
          </SwiperSlide>
        ))}
      </Swiper>
      <ThumbsContainer>
        <Swiper
          onSwiper={setThumbsSwiper as any}
          watchSlidesVisibility
          watchSlidesProgress
          slidesPerView={2}
          spaceBetween={10}
          loop={true}
          breakpoints={{
            2000: {
              slidesPerView: 6,
            },
            1600: {
              slidesPerView: 5,
            },
            1200: {
              slidesPerView: 4,
            },
            800: {
              slidesPerView: 3,
            },
            500: {
              slidesPerView: 2,
            },
          }}
        >
          {nowPlaying.map((content, index: number) => (
            <SwiperSlide key={index}>
              <MainCatalog content={content} isShow={isShow} isThumbnail />
            </SwiperSlide>
          ))}
        </Swiper>
      </ThumbsContainer>
    </Container>
  );
};

export default MainScreen;
