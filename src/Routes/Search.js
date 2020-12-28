import { moviesApi, tvApi } from "api";
import React, { useState } from "react";
import Loader from "components/Loader";
import Section from "components/Section";
import Message from "components/Message";
import Poster from "components/Poster";
import { Helmet } from "react-helmet";
import { SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";
import { Container, Form, Input } from "styles/search";

const Search = () => {
  const [results, setResults] = useState({
    movieResults: null,
    tvResults: null,
  });
  const [term, setTerm] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchResults = async (term) => {
    setLoading(true);
    try {
      const {
        data: { results: movieResults },
      } = await moviesApi.search(term);
      const {
        data: { results: tvResults },
      } = await tvApi.search(term);
      setResults({
        movieResults,
        tvResults,
      });
    } catch (error) {
      setError("페이지 정보를 찾을 수 없습니다.");
    } finally {
      setLoading(false);
    }
  };

  const updateTerm = (e) => {
    const {
      target: { value },
    } = e;
    setTerm(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (term !== "") {
      fetchResults(term);
    }
  };

  return (
    <>
      <Helmet>
        <title>검색 | Jaeflix</title>
      </Helmet>
      <Container>
        <Form onSubmit={handleSubmit}>
          <Input
            placeholder="영화 또는 TV 검색..."
            value={term}
            onChange={updateTerm}
          ></Input>
        </Form>
        {loading ? (
          <Loader />
        ) : (
          <>
            {results.movieResults && results.movieResults.length > 0 && (
              <Section title="영화 검색 결과">
                {results.movieResults.map((movie) => (
                  <SwiperSlide key={movie.id}>
                    <Poster
                      key={movie.id}
                      id={movie.id}
                      imageUrl={movie.poster_path}
                      title={movie.title}
                      rating={movie.vote_average}
                      year={movie.release_date}
                      isMovie={true}
                    />
                  </SwiperSlide>
                ))}
              </Section>
            )}
            {results.tvResults && results.tvResults.length > 0 && (
              <Section title="TV 검색 결과">
                {results.tvResults.map((show) => (
                  <SwiperSlide key={show.id}>
                    <Poster
                      key={show.id}
                      id={show.id}
                      imageUrl={show.poster_path}
                      title={show.name}
                      rating={show.vote_average}
                      year={show.first_air_date}
                    />
                  </SwiperSlide>
                ))}
              </Section>
            )}
            {error && <Message text={error} />}
            {results.tvResults &&
              results.movieResults &&
              results.movieResults.length === 0 &&
              results.tvResults.length === 0 && (
                <Message text={"일치하는 결과가 없습니다."} />
              )}
          </>
        )}
      </Container>
    </>
  );
};

export default Search;
