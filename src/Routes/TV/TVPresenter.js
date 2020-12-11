import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Section from "Components/Section";
import Loader from "Components/Loader";
import Message from "Components/Message";
import Poster from "Components/Poster";

const Container = styled.div`
  padding: 0px 20px;
`;

const TVPresenter = ({ topRated, airingToday, popular, error, loading }) =>
  loading ? (
    <Loader />
  ) : (
    <Container>
      {airingToday && airingToday.length > 0 && (
        <Section title="현재 방영중">
          {airingToday.map((show) => (
            <Poster
              key={show.id}
              id={show.id}
              imageUrl={show.poster_path}
              title={show.name}
              rating={show.vote_average}
              year={show.first_air_date}
            />
          ))}
        </Section>
      )}
      {popular && popular.length > 0 && (
        <Section title="인기">
          {popular.map((show) => (
            <Poster
              key={show.id}
              id={show.id}
              imageUrl={show.poster_path}
              title={show.name}
              rating={show.vote_average}
              year={show.first_air_date}
            />
          ))}
        </Section>
      )}
      {topRated && topRated.length > 0 && (
        <Section title="최고 평점">
          {topRated.map((show) => (
            <Poster
              key={show.id}
              id={show.id}
              imageUrl={show.poster_path}
              title={show.name}
              rating={show.vote_average}
              year={show.first_air_date}
            />
          ))}
        </Section>
      )}
      {error && <Message text={error} />}
    </Container>
  );

TVPresenter.propTypes = {
  topRated: PropTypes.array,
  airingToday: PropTypes.array,
  popular: PropTypes.array,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};

export default TVPresenter;
