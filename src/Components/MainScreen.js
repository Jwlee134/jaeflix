import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import SwiperCore, { Navigation, Thumbs } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";
import { Link } from "react-router-dom";

SwiperCore.use([Navigation, Thumbs]);

const Container = styled.div`
  height: calc(100vh - 50px);
  margin-top: 50px;
  position: relative;
  text-shadow: 0px 0px 4px rgba(0, 0, 0, 1);
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
  font-size: 17px;
  display: flex;
  align-items: center;
  margin: 10px;

  line-height: 1.3;
`;

const SectionTitle = styled.div`
  font-size: 50px;
  display: flex;
  align-items: center;
  font-weight: 600;
`;

const BackDrop = styled.div`
  border-radius: 5px;
  background-image: url(${(props) => props.bgUrl});
  background-position: center center;
  background-size: cover;
  width: 100%;
  height: ${(props) => (props.thumb ? "20vh" : "calc(100vh - 50px);")};
  z-index: -1;
  padding: 0px 70px;
  padding-top: 50px;
`;

const SectionData = styled.div`
  display: flex;
  justify-content: space-between;
  height: 50vh;
  align-items: flex-end;
  padding: 0px 20px;
`;

const FirstColumn = styled.div`
  width: 50%;
`;

const SecondColumn = styled.div`
  width: 43%;
  font-size: 25px;
  line-height: 1.5;
  font-weight: 400;
  position: relative;
`;

const ContentTitle = styled.div`
  font-size: 40px;
  font-weight: 400;
  margin-bottom: 20px;
`;

const ContentData = styled.div`
  font-size: 30px;
  font-weight: 200;
  color: #ecf0f1;
`;

const GoDetail = styled.div`
  margin-top: 20px;
  font-size: 25px;
  color: white;
  text-decoration: underline;
`;

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
          slidesPerView={5}
          spaceBetween={10}
          loop={true}
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
