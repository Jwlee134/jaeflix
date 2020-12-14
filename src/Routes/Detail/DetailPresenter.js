import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from "Components/Loader";
import { Helmet } from "react-helmet";
import Message from "Components/Message";
import Section from "Components/Section";
import Poster from "Components/Poster";
import { withRouter } from "react-router-dom";

const Container = styled.div`
  height: 100vh;
  width: 100%;
  position: relative;
  padding: 50px;
  padding-top: 100px;
`;

const Backdrop = styled.div`
  position: absolute;
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

const Cover = styled.img`
  max-width: 100%;
  max-height: 100%;
  z-index: 1;
  border-radius: 5px;
`;

const Title = styled.div`
  font-size: 40px;
  margin-bottom: 20px;
`;

const Overview = styled.p`
  opacity: 0.8;
  line-height: 1.8;
  width: 90%;
`;

const Data = styled.div`
  width: 70%;
  height: 100%;
  margin-left: 40px;
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 3fr 8fr;
  width: 100%;
  height: calc(100vh - 100px);
  margin-bottom: 100px;
  @media screen and (max-width: 1000px) {
    grid-template-columns: none;
    grid-template-rows: 30vh calc(70vh - 120px);
    ${Cover} {
      margin: 0 auto;
    }
    ${Data} {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-left: 0;
      width: 100%;
      margin-top: 20px;
    }
    ${Overview} {
      width: 100%;
      text-align: center;
    }
  }
  @media screen and (max-width: 500px) {
    ${Title} {
      font-size: 30px;
    }
  }
  @media screen and (max-width: 400px) {
    ${Overview} {
      font-size: 10px;
      width: 100%;
    }
  }
`;

const ItemContainer = styled.div`
  margin-bottom: 20px;
`;

const Item = styled.span``;

const Divider = styled.span`
  margin: 0px 10px;
`;

const DetailPresenter = ({
  result,
  recommends,
  error,
  loading,
  location: { pathname },
}) =>
  loading ? (
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
      <Content>
        <Cover src={`https://image.tmdb.org/t/p/w500${result.poster_path}`} />
        <Data>
          <Title>{result.title ? result.title : result.name}</Title>
          <ItemContainer>
            <Item>
              {result.release_date
                ? `${result.release_date} 개봉`
                : result.first_air_date}
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.runtime
                ? `${result.runtime}분`
                : result.runtime === 0
                ? "시간 정보 없음"
                : `${result.episode_run_time[0]}분`}
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.genres &&
                result.genres.map((genre, index) =>
                  index === result.genres.length - 1
                    ? genre.name
                    : `${genre.name} / `
                )}
            </Item>
          </ItemContainer>
          <Overview>
            {result.overview ? result.overview : "등록된 소개글이 없습니다."}
          </Overview>
        </Data>
      </Content>
      {recommends &&
        recommends.length > 0 &&
        (pathname.includes("/movie/") ? (
          <Section title="추천 영화">
            {recommends.map((recommend) => (
              <Poster
                key={recommend.id}
                id={recommend.id}
                imageUrl={recommend.poster_path}
                title={recommend.title}
                year={recommend.release_date}
                rating={recommend.vote_average}
                isMovie={true}
              />
            ))}
          </Section>
        ) : (
          <Section title="추천 TV 프로그램">
            {recommends.map((recommend) => (
              <Poster
                key={recommend.id}
                id={recommend.id}
                imageUrl={recommend.poster_path}
                title={recommend.name}
                rating={recommend.vote_average}
                year={recommend.first_air_date}
              />
            ))}
          </Section>
        ))}
    </Container>
  );

DetailPresenter.propTypes = {
  result: PropTypes.object,
  recommends: PropTypes.array,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};

export default withRouter(DetailPresenter);
