import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Section from "Components/Section";

const Container = styled.div`
  padding: 0px 10px;
`;

const HomePresenter = ({ nowPlaying, upcoming, popular, error, loading }) =>
  loading ? null : (
    <Container>
      {nowPlaying && nowPlaying.length > 0 ? (
        <Section title="현재 상영중">
          {nowPlaying.map((movie) => movie.title)}
        </Section>
      ) : null}
      {popular && popular.length > 0 ? (
        <Section title="인기 영화">
          {popular.map((movie) => movie.title)}
        </Section>
      ) : null}
      {upcoming && upcoming.length > 0 ? (
        <Section title="개봉 예정">
          {upcoming.map((movie) => movie.title)}
        </Section>
      ) : null}
    </Container>
  );

HomePresenter.propTypes = {
  nowPlaying: PropTypes.array,
  upcoming: PropTypes.array,
  popular: PropTypes.array,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};

export default HomePresenter;
