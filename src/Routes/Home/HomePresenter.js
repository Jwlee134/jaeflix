import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from "Components/Loader";

const Container = styled.div`
  height: 100vh;
`;

const HomePresenter = ({ nowPlaying, error, loading }) =>
  loading ? (
    <Loader />
  ) : (
    <Container>
      {nowPlaying &&
        nowPlaying.length > 0 &&
        nowPlaying.map((movie) => movie.title)}
    </Container>
  );

HomePresenter.propTypes = {
  nowPlaying: PropTypes.array,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};

export default HomePresenter;
