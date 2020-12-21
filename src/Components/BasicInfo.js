import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

const Overview = styled.div`
  margin-top: 15px;
  line-height: 1.7;
  opacity: 0.8;
  font-size: 14px;
`;

const Container = styled.div`
  @media screen and (max-width: 400px) {
    ${Overview},span {
      font-size: 13px;
    }
  }
`;

const Ul = styled.ul`
  border-left: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 3px;
  padding-left: 10px;
`;

const Li = styled.div`
  :not(:last-child) {
    margin-bottom: 10px;
  }
  font-size: 14px;
`;

const Title = styled.span`
  margin-right: 10px;
  opacity: 0.6;
`;

const BasicInfo = ({
  genres,
  runtime,
  overview,
  date,
  rating,
  countries,
  location: { pathname },
}) => (
  <Container>
    <Ul>
      <Li>
        <Title>시간</Title>
        <span>{runtime ? `${runtime}분` : "등록되지 않음"}</span>
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

BasicInfo.propTypes = {
  genres: PropTypes.array,
  overview: PropTypes.string,
  date: PropTypes.string,
  rating: PropTypes.number,
  countries: PropTypes.array,
};

export default withRouter(BasicInfo);
