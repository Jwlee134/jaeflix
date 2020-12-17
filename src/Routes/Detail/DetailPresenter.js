import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from "Components/Loader";
import { Helmet } from "react-helmet";
import Message from "Components/Message";
import Section from "Components/Section";
import Poster from "Components/Poster";
import { withRouter } from "react-router-dom";
import Detail from "Components/Detail";
import { SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";

const Container = styled.div`
  height: 100vh;
  width: 100%;
  position: relative;
  padding: 30px;
  padding-top: 100px;
  @media screen and (max-width: 400px) {
    padding-left: 30px;
    padding-right: 30px;
  }
`;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.bgImg});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: -1;
`;

const DetailPresenter = ({
  result,
  recommends,
  error,
  loading,
  casts,
  crews,
  location: { pathname },
}) => {
  const isMovie = pathname.includes("/movie/");
  return loading ? (
    <>
      <Loader />
      <Helmet>
        <title>로딩중 | Jaeflix</title>
      </Helmet>
    </>
  ) : error ? (
    <Message text="결과가 없습니다." />
  ) : (
    <Container>
      <Helmet>
        <title>{result.title ? result.title : result.name} | Jaeflix</title>
      </Helmet>
      <Backdrop
        bgImg={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
      />
      <Detail
        id={result.id}
        imgUrl={result.poster_path}
        title={isMovie ? result.title : result.name}
        originTitle={isMovie ? result.original_title : result.original_name}
        date={isMovie ? result.release_date : result.first_air_date}
        runtime={isMovie ? result.runtime : result.episode_run_time}
        genres={result.genres}
        overview={result.overview}
        rating={result.vote_average}
        casts={casts}
        crews={crews}
        videos={result.videos.results}
      />
      {recommends &&
        recommends.length > 0 &&
        (isMovie ? (
          <Section title="관련 영화 추천">
            {recommends.map((recommend) => (
              <SwiperSlide key={recommend.id}>
                <Poster
                  key={recommend.id}
                  id={recommend.id}
                  imageUrl={recommend.poster_path}
                  title={recommend.title}
                  year={recommend.release_date}
                  rating={recommend.vote_average}
                  isMovie={true}
                />
              </SwiperSlide>
            ))}
          </Section>
        ) : (
          <Section title="관련 TV 프로그램 추천">
            {recommends.map((recommend) => (
              <SwiperSlide key={recommend.id}>
                <Poster
                  key={recommend.id}
                  id={recommend.id}
                  imageUrl={recommend.poster_path}
                  title={recommend.name}
                  rating={recommend.vote_average}
                  year={recommend.first_air_date}
                />
              </SwiperSlide>
            ))}
          </Section>
        ))}
    </Container>
  );
};

DetailPresenter.propTypes = {
  result: PropTypes.object,
  recommends: PropTypes.array,
  casts: PropTypes.array,
  crews: PropTypes.array,
  videos: PropTypes.array,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};

export default withRouter(DetailPresenter);
