import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { Container, Li, Overview, Title, Ul } from "styles/basicInfo";
import { useSelector } from "react-redux";

const BasicInfo = ({ location: { pathname } }) => {
  const {
    genres,
    overview,
    vote_average: rating,
    release_date,
    first_air_date,
    runtime,
    episode_run_time,
    production_countries: countries,
  } = useSelector((state) => state.detail.result);

  const runningTime = runtime ? runtime : episode_run_time;
  const date = release_date ? release_date : first_air_date;

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
            {genres &&
              genres.length > 0 &&
              genres.map((genre, index) =>
                index === genres.length - 1 ? genre.name : `${genre.name} / `
              )}
            {genres.length === 0 && "등록되지 않음"}
          </span>
        </Li>
        <Li>
          <Title>{pathname.includes("movie") ? "개봉" : "방영"}</Title>
          <span>{date ? date : "등록되지 않음"}</span>
        </Li>
        <Li>
          <Title>평점</Title>
          <span>{rating ? rating : "등록되지 않음"}</span>
        </Li>
        <Li>
          <Title>국가</Title>
          <span>
            {countries &&
              countries.length > 0 &&
              countries.map((country, index) =>
                index === countries.length - 1
                  ? country.name
                  : `${country.name} / `
              )}
            {countries.length === 0 && "등록되지 않음"}
          </span>
        </Li>
      </Ul>
      <Overview>{overview ? overview : "등록된 소개글이 없습니다."}</Overview>
    </Container>
  );
};

BasicInfo.propTypes = {
  genres: PropTypes.array,
  overview: PropTypes.string,
  date: PropTypes.string,
  rating: PropTypes.number,
  countries: PropTypes.array,
};

export default withRouter(BasicInfo);
