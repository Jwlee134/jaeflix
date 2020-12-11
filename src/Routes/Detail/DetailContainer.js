import { moviesApi, tvApi } from "api";
import React from "react";
import DetailPresenter from "./DetailPresenter";

class DetailContainer extends React.Component {
  state = {
    result: null,
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
        this.setState({ result });
      } else {
        const { data: result } = await tvApi.tvDetail(id);
        this.setState({ result });
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

  render() {
    const { result, error, loading } = this.state;
    return <DetailPresenter result={result} error={error} loading={loading} />;
  }
}

export default DetailContainer;
