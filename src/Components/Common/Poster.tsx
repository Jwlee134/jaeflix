import React from "react";
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
} from "styles/poster";

interface IProps {
  id: number;
  imageUrl: string;
  title: string;
  rating?: number;
  year?: string;
  isMovie?: boolean;
  isCredits?: boolean;
  isCompany?: boolean;
}

const Poster = ({
  id,
  imageUrl,
  title,
  rating,
  year,
  isMovie = false,
  isCredits = false,
  isCompany = false,
}: IProps) => {
  return isCredits ? (
    <Container>
      <ImgContainer>
        <Img
          isContents={false}
          isCompany={isCompany ? true : false}
          bgUrl={
            imageUrl
              ? `https://image.tmdb.org/t/p/w185${imageUrl}`
              : "/noImg.png"
          }
        />
      </ImgContainer>
      <Title>{title}</Title>
      <Year>{year}</Year>
    </Container>
  ) : (
    <Link to={isMovie ? `/movie/${id}` : `/tv/${id}`}>
      <Container>
        <ImgContainer>
          <Img
            isContents={true}
            isCompany={false}
            bgUrl={
              imageUrl
                ? `https://image.tmdb.org/t/p/w185${imageUrl}`
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
        <Title>{title}</Title>
        <Year>{year ? year.substring(0, 4) : "연도 정보 없음"}</Year>
      </Container>
    </Link>
  );
};

export default Poster;
