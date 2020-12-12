import { moviesApi, tvApi } from "api";
import React from "react";
import DetailPresenter from "./DetailPresenter";

class DetailContainer extends React.Component {
  state = {
    result: null,
    recommends: null,
    error: null,
    loading: true,
  };

  async componentDidMount() {
    const {
      match: {
        params: { id },
      },
      history: { push },
      location: { pathname },
    } = this.props;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
      return push("/");
    }
    const isMovie = pathname.includes("/movie/");
    try {
      if (isMovie) {
        const { data: result } = await moviesApi.movieDetail(id);
        const {
          data: { results: recommends },
        } = await moviesApi.recommends(id);
        this.setState({ result, recommends });
      } else {
        const { data: result } = await tvApi.tvDetail(id);
        const {
          data: { results: recommends },
        } = await tvApi.recommends(id);
        this.setState({ result, recommends });
      }
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

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.setState({
        result: null,
        recommends: null,
        error: null,
        loading: true,
      });
      this.render();
      this.componentDidMount();
    }
  }

  render() {
    const { result, recommends, error, loading } = this.state;
    return (
      <DetailPresenter
        result={result}
        error={error}
        loading={loading}
        recommends={recommends}
      />
    );
  }
}

export default DetailContainer;
