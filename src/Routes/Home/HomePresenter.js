import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from "Components/Loader";
import Helmet from "react-helmet";
import Carousel from "react-bootstrap/Carousel";
import Message from "Components/Message";
import { Link } from "react-router-dom";

const Container = styled.div`
  height: 100vh;
`;

const SCarousel = styled(Carousel.Caption)`
  height: 100%;
  h1 {
    font-size: 40px;
    margin-top: 80px;
    margin-bottom: 30px;
    font-weight: 600;
  }
  h2 {
    margin-top: 30px;
    font-size: 20px;
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
        <Carousel>
          {nowPlaying &&
            nowPlaying.length > 0 &&
            nowPlaying.map((movie, index) => (
              <Carousel.Item key={index}>
                <SCarousel>
                  <h1>현재 상영중인 영화들을 만나보세요.</h1>
                  <div>
                    <Link to={`/movie/${movie.id}`}>
                      <img
                        alt={movie.id}
                        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                      />
                      <h2>클릭하여 상세 정보로 이동합니다.</h2>
                    </Link>
                  </div>
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
