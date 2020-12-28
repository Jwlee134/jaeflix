import React, { useEffect } from "react";
import Loader from "Components/Loader";
import { Helmet } from "react-helmet";
import Message from "Components/Message";
import Section from "Components/Section";
import Poster from "Components/Poster";
import DetailInfo from "Components/DetailInfo";
import { SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";
import { Backdrop, Container } from "styles/detail";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieDetail, fetchTVDetail, reload } from "store/detail";

const Detail = ({
  match: {
    params: { id },
  },
  location: { pathname },
}) => {
  const { result, recommends, casts, crews, loading, error } = useSelector(
    (state) => state.detail
  );
  const dispatch = useDispatch();

  const isMovie = pathname.includes("/movie/");

  useEffect(() => {
    if (isMovie) {
      dispatch(fetchMovieDetail(id));
    } else {
      dispatch(fetchTVDetail(id));
    }
    return () => dispatch(reload());
  }, [dispatch, id, isMovie]);

  if (loading) return <Loader />;
  if (error) return <Message text={error} />;

  return (
    <Container>
      <Helmet>
        <title>{result.title ? result.title : result.name} | Jaeflix</title>
      </Helmet>
      <Backdrop
        bgImg={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
      />
      <DetailInfo
        id={result.id}
        imgUrl={result.poster_path}
        title={isMovie ? result.title : result.name}
        originTitle={isMovie ? result.original_title : result.original_name}
        date={isMovie ? result.release_date : result.first_air_date}
        runtime={isMovie ? result.runtime : result.episode_run_time}
        genres={result.genres}
        overview={result.overview}
        rating={result.vote_average}
        casts={casts}
        crews={crews}
        videos={result.videos.results}
        imdbId={result.imdb_id}
        countries={result.production_countries}
        companies={result.production_companies}
      />
      {recommends &&
        recommends.length > 0 &&
        (isMovie ? (
          <Section title="관련 영화 추천">
            {recommends.map((recommend, index) => (
              <SwiperSlide key={index}>
                <Poster
                  id={recommend.id}
                  imageUrl={recommend.poster_path}
                  title={recommend.title}
                  year={recommend.release_date}
                  rating={recommend.vote_average}
                  isMovie={true}
                />
              </SwiperSlide>
            ))}
          </Section>
        ) : (
          <Section title="관련 TV 프로그램 추천">
            {recommends.map((recommend, index) => (
              <SwiperSlide key={index}>
                <Poster
                  id={recommend.id}
                  imageUrl={recommend.poster_path}
                  title={recommend.name}
                  rating={recommend.vote_average}
                  year={recommend.first_air_date}
                />
              </SwiperSlide>
            ))}
          </Section>
        ))}
      {result.seasons && result.seasons.length > 0 && (
        <Section title="시즌 정보">
          {result.seasons.map((season, index) => (
            <SwiperSlide key={index}>
              <Poster
                id={season.id}
                imageUrl={season.poster_path}
                title={season.name}
                year={season.air_date}
                rating={null}
              />
            </SwiperSlide>
          ))}
        </Section>
      )}
    </Container>
  );
};

export default Detail;
