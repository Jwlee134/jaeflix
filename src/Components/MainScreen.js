import React, { useState } from "react";
import PropTypes from "prop-types";
import SwiperCore, { Navigation, Thumbs } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";
import { Link } from "react-router-dom";
import {
  BackDrop,
  Container,
  ContentData,
  ContentTitle,
  FirstColumn,
  GoDetail,
  Item,
  SecondColumn,
  SectionData,
  SectionTitle,
  ThumbsContainer,
  Title,
} from "styles/mainScreen";

SwiperCore.use([Navigation, Thumbs]);

const MainScreen = ({ nowPlaying, isShow = false }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <Container>
      <Swiper navigation thumbs={{ swiper: thumbsSwiper }} loop={true}>
        {nowPlaying.map((content, index) => (
          <SwiperSlide key={index}>
            <Item>
              <BackDrop
                thumb={false}
                bgUrl={
                  content.backdrop_path
                    ? `https://image.tmdb.org/t/p/original${content.backdrop_path}`
                    : "/noImg.png"
                }
              >
                <SectionTitle>
                  {isShow ? "현재 방영중" : "현재 상영중"}
                </SectionTitle>
                <SectionData>
                  <FirstColumn>
                    <ContentTitle>
                      {isShow ? content.name : content.title}
                    </ContentTitle>
                    <ContentData>
                      <span>
                        {isShow && !content.first_air_date && "연도 정보 없음"}
                        {!isShow && !content.release_date && "연도 정보 없음"}
                        {isShow
                          ? content.first_air_date.substring(0, 4)
                          : content.release_date.substring(0, 4)}
                      </span>
                      <span> · </span>
                      <span>
                        {content.vote_average
                          ? `평점 ${content.vote_average}`
                          : "평점 정보 없음"}
                      </span>
                    </ContentData>
                    <Link
                      to={isShow ? `/tv/${content.id}` : `/movie/${content.id}`}
                    >
                      <GoDetail>상세 보기</GoDetail>
                    </Link>
                  </FirstColumn>
                  <SecondColumn>
                    {content.overview.length > 100
                      ? `${content.overview.substring(0, 100)}...`
                      : content.overview}
                  </SecondColumn>
                </SectionData>
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
              slidesPerView: 3,
            },
          }}
        >
          {nowPlaying.map((content, index) => (
            <SwiperSlide key={index}>
              <Item>
                <BackDrop
                  thumb={true}
                  bgUrl={
                    content.backdrop_path
                      ? `https://image.tmdb.org/t/p/original${content.backdrop_path}`
                      : "/noImg.png"
                  }
                ></BackDrop>
                <Title>{isShow ? content.name : content.title}</Title>
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
