import Loader from "Components/Loader";
import MainScreen from "Components/MainScreen";
import Section from "Components/Section";
import { SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import Poster from "Components/Poster";
import Message from "Components/Message";
import { Container } from "styles/movieTv";
import { fetchTVs } from "store/tv";
import { useDispatch, useSelector } from "react-redux";

const TV = () => {
  const { airingToday, topRated, popular, error, loading } = useSelector(
    (state) => state.tvs
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTVs());
  }, [dispatch]);

  if (loading) return <Loader />;
  if (error) return <Message text={error} />;

  return (
    <>
      <Helmet>
        <title>TV | Jaeflix</title>
      </Helmet>
      <MainScreen nowPlaying={airingToday} isShow={true} />
      <Container>
        {popular && popular.length > 0 && (
          <Section title="인기">
            {popular.map((show) => (
              <SwiperSlide key={show.id}>
                <Poster
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
        {topRated && topRated.length > 0 && (
          <Section title="최고 평점">
            {topRated.map((show) => (
              <SwiperSlide key={show.id}>
                <Poster
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
      </Container>
    </>
  );
};

export default TV;
