import { tvApi } from "api";
import Loader from "components/Loader";
import MainScreen from "components/MainScreen";
import Section from "components/Section";
import { SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import Poster from "components/Poster";
import Message from "components/Message";

const Container = styled.div`
  margin-top: 80px;
  padding: 0px 20px;
`;

const TV = () => {
  const [TV, setTV] = useState({ topRated: [], airingToday: [], popular: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTV = async () => {
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
      setTV({
        topRated,
        airingToday,
        popular,
      });
    } catch (error) {
      setError("페이지 정보를 찾을 수 없습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTV();
  }, []);

  return (
    <>
      <Helmet>
        <title>TV | Jaeflix</title>
      </Helmet>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MainScreen nowPlaying={TV.airingToday} isShow={true} />
          <Container>
            {TV.popular && TV.popular.length > 0 && (
              <Section title="인기">
                {TV.popular.map((show) => (
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
            {TV.topRated && TV.topRated.length > 0 && (
              <Section title="최고 평점">
                {TV.topRated.map((show) => (
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
            {error && <Message text={error} />}
          </Container>
        </>
      )}
      ;
    </>
  );
};

export default TV;
