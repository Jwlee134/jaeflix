import React from "react";
import { useSelector } from "react-redux";

import styled from "styled-components";

import Section from "../Common/Section";
import Poster from "../Common/Poster";

import { SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";
import { RootState } from "store";

const Container = styled.div``;

const NoCredits = styled.div`
  font-size: 14px;
  opacity: 0.8;
`;

const Credits = () => {
  const { crews, casts, result } = useSelector(
    (state: RootState) => state.detail
  );

  return (
    <Container>
      {crews.length > 0 && (
        <Section title="제작" isCredits={true}>
          {crews.map((crew, index) => (
            <SwiperSlide key={index}>
              <Poster
                id={crew.id}
                title={crew.name}
                year={crew.department}
                isCredits={true}
                imageUrl={crew.profile_path}
              />
            </SwiperSlide>
          ))}
        </Section>
      )}
      {casts.length > 0 && (
        <Section title="출연" isCredits={true}>
          {casts.map((cast, index) => (
            <SwiperSlide key={index}>
              <Poster
                id={cast.id}
                title={cast.name}
                year={cast.character}
                isCredits={true}
                imageUrl={cast.profile_path}
              />
            </SwiperSlide>
          ))}
        </Section>
      )}
      {result?.production_companies &&
        result?.production_companies?.length > 0 && (
          <Section title="배급" isCredits={true}>
            {result?.production_companies?.map((company, index) => (
              <SwiperSlide key={index}>
                <Poster
                  id={company.id}
                  title={company.name}
                  isCredits={true}
                  imageUrl={company.logo_path}
                />
              </SwiperSlide>
            ))}
          </Section>
        )}
      {!crews && !casts && <NoCredits>등록된 정보가 없습니다.</NoCredits>}
    </Container>
  );
};

export default Credits;
