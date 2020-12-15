import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Section from "./Section";
import Poster from "./Poster";

const Container = styled.div``;

const NoCredits = styled.div`
  font-size: 14px;
  opacity: 0.8;
`;

const Credits = ({ casts, crews }) => (
  <Container>
    {crews && casts && (
      <>
        <Section title="제작" isPeople={true}>
          {crews &&
            crews.length > 0 &&
            crews.map((crew) => (
              <Poster
                key={crew.id}
                id={crew.id}
                title={crew.name}
                year={crew.department}
                isPeople={true}
                imageUrl={crew.profile_path}
              />
            ))}
        </Section>
        <Section title="배우" isPeople={true}>
          {casts &&
            casts.length > 0 &&
            casts.map((cast) => (
              <Poster
                key={cast.id}
                id={cast.id}
                title={cast.name}
                year={cast.character}
                isPeople={true}
                imageUrl={cast.profile_path}
              />
            ))}
        </Section>
      </>
    )}
    {!crews && !casts && <NoCredits>등록된 정보가 없습니다.</NoCredits>}
  </Container>
);

Credits.propTypes = {
  casts: PropTypes.array,
  crews: PropTypes.array,
};

export default Credits;
