import { moviesApi, tvApi } from "api";
import React, { useState } from "react";
import styled from "styled-components";
import Loader from "Components/Loader";
import Section from "Components/Section";
import Message from "Components/Message";
import Poster from "Components/Poster";
import { Helmet } from "react-helmet";
import { SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";

const Container = styled.div`
  margin-top: 80px;
  padding: 0px 20px;
  height: 100%;
`;

const Form = styled.form`
  margin-bottom: 50px;
  width: 100%;
`;

const Input = styled.input`
  all: unset;
  font-size: 30px;
  width: 100%;
`;

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
