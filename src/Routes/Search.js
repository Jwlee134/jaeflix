import React, { useState } from "react";
import Loader from "Components/Loader";
import Section from "Components/Section";
import Message from "Components/Message";
import Poster from "Components/Poster";
import { Helmet } from "react-helmet";
import { SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";
import { Container, Form, Input } from "styles/search";
import { Text } from "styles/message";
import { useDispatch, useSelector } from "react-redux";
import { fetchResults } from "store/search";

const Search = () => {
  const { movieResults, tvResults, error, loading } = useSelector(
    (state) => state.search
  );
  const dispatch = useDispatch();
  const [term, setTerm] = useState("");

  const updateTerm = (e) => {
    const {
      target: { value },
    } = e;
    setTerm(value);
  };

  const handleSubmit = (e) => {
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
        {movieResults && movieResults.length > 0 && (
          <Section title="영화 검색 결과">
            {movieResults.map((movie) => (
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
            {tvResults.map((show) => (
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
