import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";

import { fetchResults } from "store/search";
import { RootState } from "store";

import Loader from "Components/Loader";
import Section from "Components/Common/Section";
import Message from "Components/Message";
import Poster from "Components/Common/Poster";

import { SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";

import styled from "styled-components";

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

const Text = styled.div`
  font-size: 30px;
  font-weight: 300;
  color: #95a5a6;
  margin-bottom: 20px;
`;

const Search = () => {
  const { movieResults, tvResults, error, loading } = useSelector(
    (state: RootState) => state.search
  );
  const dispatch = useDispatch();
  const [term, setTerm] = useState("");

  const updateTerm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    setTerm(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (term !== "") {
      dispatch(fetchResults(term));
    }
  };

  if (loading) return <Loader />;
  if (error) return <Message text={error} />;

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
        {movieResults && movieResults?.length > 0 && (
          <Section title="영화 검색 결과">
            {movieResults?.map((movie) => (
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
        {tvResults && tvResults.length > 0 && (
          <Section title="TV 검색 결과">
            {tvResults?.map((show) => (
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
        {tvResults &&
          movieResults &&
          movieResults.length === 0 &&
          tvResults.length === 0 && <Text>검색 결과가 없습니다.</Text>}
      </Container>
    </>
  );
};

export default Search;
