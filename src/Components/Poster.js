import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div``;

const Img = styled.div`
  background-image: url(${(props) => props.bgUrl});
  width: 100%;
  height: 270px;
  background-size: cover;
  background-position: center center;
  border-radius: 5px;
  transition: opacity 0.1s linear;
  @media screen and (max-width: 1000px) {
    height: 250px;
  }
  @media screen and (max-width: 800px) {
    height: 240px;
  }
  @media screen and (max-width: 600px) {
    height: 230px;
  }
  @media screen and (max-width: 450px) {
    height: 200px;
  }
`;

const Text = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Star = styled.div`
  margin-bottom: 3px;
  margin-right: 3px;
`;

const Rating = styled.div`
  position: absolute;
  bottom: 4px;
  right: 7px;
  opacity: 0;
  transition: opacity 0.1s linear;
  display: flex;
`;

const Detail = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.1s linear;
`;

const ImgContainer = styled.div`
  margin-bottom: 10px;
  &:hover {
    ${Img} {
      opacity: 0.3;
    }
    ${Detail} {
      opacity: 1;
    }
    ${Rating} {
      opacity: 1;
    }
  }
  position: relative;
`;

const Title = styled.span`
  display: block;
  padding-bottom: 5px;
`;

const Year = styled.span`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
`;

const Poster = ({ id, imageUrl, title, rating, year, isMovie = false }) => (
  <Link to={isMovie ? `/movie/${id}` : `/tv/${id}`}>
    <Container>
      <ImgContainer>
        <Img
          bgUrl={
            imageUrl
              ? `https://image.tmdb.org/t/p/w300${imageUrl}`
              : "/noImg.png"
          }
        />
        <Detail>상세 보기</Detail>
        <Rating>
          <Star>★</Star> <Text>{rating}/10</Text>
        </Rating>
      </ImgContainer>
      <Title>
        {title.length > 18 ? `${title.substring(0, 17)}...` : title}
      </Title>
      <Year>{year.substring(0, 4)}</Year>
    </Container>
  </Link>
);

Poster.propTypes = {
  imageUrl: PropTypes.string,
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  rating: PropTypes.number,
  year: PropTypes.string,
  isMovie: PropTypes.bool,
};

export default Poster;
