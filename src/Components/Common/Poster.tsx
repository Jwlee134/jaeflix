import React from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

const Img = styled.img<{ isCredits: boolean }>`
  border-radius: 5px;
  transition: opacity 0.1s linear;
  height: 230px;
  max-width: 100%;
`;

const Container = styled.div<{ isCredit: boolean }>`
  width: 153px;
  @media screen and (max-width: 500px) {
    width: ${({ isCredit }) => (isCredit ? "100px" : "120px")};
    ${Img} {
      height: ${({ isCredit }) => (isCredit ? "150px" : "180px")};
    }
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
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 5px;
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
  height: 100%;
  &:hover {
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
  line-height: 1.2;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const Year = styled.span`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
`;

interface IProps {
  id: number;
  imageUrl: string | null;
  title: string;
  rating?: number;
  year?: string;
  isMovie?: boolean;
  isCredits?: boolean;
}

const Poster = ({
  id,
  imageUrl,
  title,
  rating,
  year,
  isMovie = false,
  isCredits = false,
}: IProps) =>
  !isCredits ? (
    <Container isCredit={false}>
      <Link to={isMovie ? `/movie/${id}` : `/tv/${id}`}>
        <ImgContainer>
          <Img
            isCredits={isCredits}
            src={
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
        <Title>{title}</Title>
        <Year>{year ? year.substring(0, 4) : "연도 정보 없음"}</Year>
      </Link>
    </Container>
  ) : (
    <Container isCredit={true}>
      <ImgContainer>
        <Img
          isCredits={isCredits}
          src={
            imageUrl
              ? `https://image.tmdb.org/t/p/w300${imageUrl}`
              : "/noImg.png"
          }
        />
      </ImgContainer>
      <Title>{title}</Title>
      <Year>{year}</Year>
    </Container>
  );

export default Poster;
