import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from "Components/Loader";
import Helmet from "react-helmet";
import Carousel from "react-bootstrap/Carousel";
import Message from "Components/Message";
import { Link } from "react-router-dom";

const Container = styled.div``;

const ImgContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const SCarousel = styled(Carousel.Caption)`
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 15% 70% 15%;
  height: calc(100vh - 80px);
  padding: 0;
  align-items: center;
  h1 {
    font-size: 40px;
    font-weight: 600;
    line-height: 1.3;
  }
  h2 {
    font-size: 20px;
    line-height: 1.3;
  }
  @media screen and (max-width: 920px) {
    h1 {
      font-size: 35px;
    }
  }
  @media screen and (max-width: 805px) {
    h1 {
      font-size: 30px;
    }
  }
  @media screen and (max-width: 690px) {
    h1 {
      font-size: 25px;
    }
    h2 {
      font-size: 15px;
    }
  }
`;

const Img = styled.img`
  height: 100%;
  object-fit: cover;
  border-radius: 5px;
  @media screen and (max-width: 450px) {
    width: 100%;
    height: inherit;
  }
`;

const Cover = styled.img`
  width: 100%;
  height: 99vh;
  object-fit: cover;
  filter: blur(3px);
`;

const HomePresenter = ({ nowPlaying, error, loading }) => (
  <>
    <Helmet>
      <title>홈 | Jaeflix</title>
    </Helmet>
    {loading ? (
      <Loader />
    ) : error ? (
      <Message text="페이지를 불러올 수 없습니다." />
    ) : (
      <Container>
        <Carousel interval={null}>
          {nowPlaying &&
            nowPlaying.length > 0 &&
            nowPlaying.map((movie, index) => (
              <Carousel.Item key={index}>
                {console.log(movie)}
                <SCarousel>
                  <h1>현재 상영중인 영화들을 만나보세요.</h1>
                  <ImgContainer>
                    <Link to={`/movie/${movie.id}`}>
                      <Img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      />
                    </Link>
                  </ImgContainer>
                  <h2>클릭하여 상세 페이지로 이동합니다.</h2>
                </SCarousel>
                <Cover
                  src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                />
              </Carousel.Item>
            ))}
        </Carousel>
      </Container>
    )}
  </>
);

HomePresenter.propTypes = {
  nowPlaying: PropTypes.array,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};

export default HomePresenter;
