import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  Container,
  Detail,
  Img,
  ImgContainer,
  Rating,
  Star,
  Text,
  Title,
  Year,
} from "Styles/Poster";

const Poster = ({
  id,
  imageUrl,
  title,
  rating,
  year,
  isMovie = false,
  isCredits = false,
  isCompany = false,
}) =>
  isCredits ? (
    isCompany ? (
      <Container>
        <ImgContainer>
          <Img
            isContents={false}
            isCompany={true}
            bgUrl={
              imageUrl
                ? `https://image.tmdb.org/t/p/w300${imageUrl}`
                : "/noImg.png"
            }
          />
        </ImgContainer>
        <Title>{title}</Title>
      </Container>
    ) : (
      <Container>
        <ImgContainer>
          <Img
            isContents={false}
            isCompany={false}
            bgUrl={
              imageUrl
                ? `https://image.tmdb.org/t/p/w300${imageUrl}`
                : "/noImg.png"
            }
          />
        </ImgContainer>
        <Title>{title}</Title>
        <Year>{year}</Year>
      </Container>
    )
  ) : (
    <Link to={isMovie ? `/movie/${id}` : `/tv/${id}`}>
      <Container>
        <ImgContainer>
          <Img
            isContents={true}
            isCompany={false}
            bgUrl={
              imageUrl
                ? `https://image.tmdb.org/t/p/w300${imageUrl}`
                : "/noImg.png"
            }
          />
          <Detail>상세 보기</Detail>
          {rating ? (
            <Rating>
              <Star>★</Star> <Text>{rating}/10</Text>
            </Rating>
          ) : (
            ""
          )}
        </ImgContainer>
        <Title>
          {title.length > 18 ? `${title.substring(0, 17)}...` : title}
        </Title>
        <Year>{year ? year.substring(0, 4) : "연도 정보 없음"}</Year>
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
  isCompany: PropTypes.bool,
};

export default Poster;
