import { moviesApi, tvApi } from "api";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import Loader from "Components/Loader";
import { Helmet } from "react-helmet";
import Message from "Components/Message";
import Section from "Components/Section";
import Poster from "Components/Poster";
import DetailInfo from "Components/DetailInfo";
import { SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";

const Container = styled.div`
  height: 100vh;
  width: 100%;
  position: relative;
  padding: 30px;
  padding-top: 100px;
  @media screen and (max-width: 400px) {
    padding-left: 30px;
    padding-right: 30px;
  }
  span {
    line-height: 1.2;
  }
`;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.bgImg});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: -1;
  margin-top: 50px;
`;

const Detail = ({
  match: {
    params: { id },
  },
  history: { push },
  location: { pathname },
}) => {
  const [data, setData] = useState({
    result: null,
    recommends: null,
    casts: null,
    crews: null,
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const isMovie = pathname.includes("/movie/");

  const fetchData = useCallback(async () => {
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
      return push("/");
    }
    try {
      if (isMovie) {
        const { data: result } = await moviesApi.movieDetail(id);
        const {
          data: { results: recommends },
        } = await moviesApi.recommends(id);
        const {
          data: { cast: casts, crew: crews },
        } = await moviesApi.credits(id);
        setData({ result, recommends, casts, crews });
      } else {
        const { data: result } = await tvApi.tvDetail(id);
        const {
          data: { cast: casts, crew: crews },
        } = await tvApi.credits(id);
        const {
          data: { results: recommends },
        } = await tvApi.recommends(id);
        setData({ result, recommends, casts, crews });
      }
    } catch (error) {
      setError("페이지 정보를 찾을 수 없습니다.");
    } finally {
      setLoading(false);
    }
  }, [id, isMovie, push]);

  useEffect(() => {
    fetchData();
    return () => {
      setLoading(true);
    };
  }, [fetchData]);

  return loading ? (
    <>
      <Loader />
      <Helmet>
        <title>로딩중 | Jaeflix</title>
      </Helmet>
    </>
  ) : error ? (
    <Message text="결과가 없습니다." />
  ) : (
    <Container>
      <Helmet>
        <title>
          {data.result.title ? data.result.title : data.result.name} | Jaeflix
        </title>
      </Helmet>
      <Backdrop
        bgImg={`https://image.tmdb.org/t/p/original${data.result.backdrop_path}`}
      />
      <DetailInfo
        id={data.result.id}
        imgUrl={data.result.poster_path}
        title={isMovie ? data.result.title : data.result.name}
        originTitle={
          isMovie ? data.result.original_title : data.result.original_name
        }
        date={isMovie ? data.result.release_date : data.result.first_air_date}
        runtime={isMovie ? data.result.runtime : data.result.episode_run_time}
        genres={data.result.genres}
        overview={data.result.overview}
        rating={data.result.vote_average}
        casts={data.casts}
        crews={data.crews}
        videos={data.result.videos.results}
        imdbId={data.result.imdb_id}
        countries={data.result.production_countries}
        companies={data.result.production_companies}
      />
      {data.recommends &&
        data.recommends.length > 0 &&
        (isMovie ? (
          <Section title="관련 영화 추천">
            {data.recommends.map((recommend, index) => (
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
            {data.recommends.map((recommend, index) => (
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
      {data.result.seasons && data.result.seasons.length > 0 && (
        <Section title="시즌 정보">
          {data.result.seasons.map((season, index) => (
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
