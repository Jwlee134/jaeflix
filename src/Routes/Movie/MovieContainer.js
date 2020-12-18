import { moviesApi } from "api";
import React from "react";
import MoviePresenter from "./MoviePresenter";

class MovieContainer extends React.Component {
  state = {
    nowPlaying: null,
    topRated: null,
    upcoming: null,
    popular: null,
    error: null,
    loading: true,
  };

  async componentDidMount() {
    try {
      const {
        data: { results: nowPlaying },
      } = await moviesApi.nowPlaying();
      const {
        data: { results: topRated },
      } = await moviesApi.topRated();
      const {
        data: { results: upcoming },
      } = await moviesApi.upcoming();
      const {
        data: { results: popular },
      } = await moviesApi.popular();
      this.setState({
        topRated,
        upcoming,
        popular,
        nowPlaying,
      });
    } catch (error) {
      this.setState({
        error: "페이지 정보를 찾을 수 없습니다.",
      });
    } finally {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    const {
      nowPlaying,
      topRated,
      upcoming,
      popular,
      error,
      loading,
    } = this.state;
    return (
      <MoviePresenter
        nowPlaying={nowPlaying}
        topRated={topRated}
        upcoming={upcoming}
        popular={popular}
        error={error}
        loading={loading}
      />
    );
  }
}

export default MovieContainer;
