import React from "react";
import { useLocation } from "react-router-dom";

import { useSelector } from "react-redux";

import { isMovieDetail } from "types/typeGuards";

import styled from "styled-components";
import { RootState } from "store";

const Overview = styled.div`
  margin-top: 15px;
  line-height: 1.7;
  opacity: 0.8;
  font-size: 14px;
`;

const Container = styled.div``;

const Ul = styled.ul`
  border-left: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 3px;
  padding-left: 10px;
`;

const Li = styled.li`
  :not(:last-child) {
    margin-bottom: 10px;
  }
  font-size: 14px;
`;

const Title = styled.span`
  margin-right: 10px;
  opacity: 0.6;
`;

const BasicInfo = () => {
  const { result } = useSelector((state: RootState) => state.detail);

  const runningTime = isMovieDetail(result)
    ? result.runtime
    : result?.episode_run_time;
  const date = isMovieDetail(result)
    ? result.release_date
    : result?.first_air_date;

  const { pathname } = useLocation();

  return (
    <Container>
      <Ul>
        <Li>
          <Title>시간</Title>
          <span>{runningTime ? `${runningTime}분` : "등록되지 않음"}</span>
        </Li>
        <Li>
          <Title>장르</Title>
          <span>
            {result?.genres.map((genre, index) =>
              index === result?.genres.length - 1
                ? genre.name
                : `${genre.name} / `
            )}
            {result?.genres.length === 0 && "등록되지 않음"}
          </span>
        </Li>
        <Li>
          <Title>{pathname.includes("movie") ? "개봉" : "방영"}</Title>
          <span>{date ? date : "등록되지 않음"}</span>
        </Li>
        <Li>
          <Title>평점</Title>
          <span>
            {result?.vote_average ? result?.vote_average : "등록되지 않음"}
          </span>
        </Li>
        <Li>
          <Title>국가</Title>
          <span>
            {result?.production_countries.map((country, index) =>
              index === result?.production_countries.length - 1
                ? country.name
                : `${country.name} / `
            )}
            {result?.production_countries.length === 0 && "등록되지 않음"}
          </span>
        </Li>
      </Ul>
      <Overview>
        {result?.overview ? result?.overview : "등록된 소개글이 없습니다."}
      </Overview>
    </Container>
  );
};

export default BasicInfo;
