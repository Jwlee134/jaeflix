import { tvApi } from "api";
import React from "react";
import TVPresenter from "./TVPresenter";

class TVContainer extends React.Component {
  state = {
    topRated: null,
    airingToday: null,
    popular: null,
    error: null,
    loading: true,
  };

  async componentDidMount() {
    try {
      const {
        data: { results: topRated },
      } = await tvApi.topRated();
      const {
        data: { results: airingToday },
      } = await tvApi.airingToday();
      const {
        data: { results: popular },
      } = await tvApi.popular();
      this.setState({
        topRated,
        airingToday,
        popular,
      });
    } catch (error) {
      this.setState({
        error: "Can't find movies information.",
      });
    } finally {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    const { topRated, airingToday, popular, error, loading } = this.state;
    console.log(this.state);
    return (
      <TVPresenter
        topRated={topRated}
        airingToday={airingToday}
        popular={popular}
        error={error}
        loading={loading}
      />
    );
  }
}

export default TVContainer;
