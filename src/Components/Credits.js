import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Section from "./Section";
import Poster from "./Poster";
import { SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";
import { useSelector } from "react-redux";

const Container = styled.div``;

const NoCredits = styled.div`
  font-size: 14px;
  opacity: 0.8;
`;

const Credits = () => {
  const {
    crews,
    casts,
    result: { production_companies: companies },
  } = useSelector((state) => state.detail);

  return (
    <Container>
      {crews && casts && (
        <>
          {crews.length > 0 && (
            <Section title="제작" isCredits={true}>
              {crews &&
                crews.length > 0 &&
                crews.map((crew, index) => (
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
              {casts &&
                casts.length > 0 &&
                casts.map((cast, index) => (
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
          {companies.length > 0 && (
            <Section title="배급" isCredits={true}>
              {companies &&
                companies.length > 0 &&
                companies.map((company, index) => (
                  <SwiperSlide key={index}>
                    <Poster
                      id={company.id}
                      title={company.name}
                      isCredits={true}
                      imageUrl={company.logo_path}
                      isCompany={true}
                    />
                  </SwiperSlide>
                ))}
            </Section>
          )}
        </>
      )}
      {!crews && !casts && <NoCredits>등록된 정보가 없습니다.</NoCredits>}
    </Container>
  );
};

Credits.propTypes = {
  casts: PropTypes.array,
  crews: PropTypes.array,
  companies: PropTypes.array,
};

export default Credits;
