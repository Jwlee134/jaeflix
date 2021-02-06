import React from "react";
import { useLocation } from "react-router-dom";

import { MovieDetail, TVDetail } from "types";
import { faImdb } from "@fortawesome/free-brands-svg-icons";
import { isMovieDetail } from "types/typeGuards";

import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DetailTabs from "./DetailTabs";

const Cover = styled.img`
  max-width: 100%;
  max-height: 100%;
  z-index: 1;
  border-radius: 10px;
  margin: 0 auto;
`;

const TitleContainer = styled.div`
  margin-bottom: 15px;
`;

const Title = styled.span`
  font-size: 40px;
`;

const Overview = styled.p`
  opacity: 0.8;
  line-height: 1.8;
  width: 90%;
`;

const BasicData = styled.span`
  opacity: 0.8;
  font-size: 15px;
  font-weight: 300;
`;

const Data = styled.div`
  width: 60vw;
  max-height: calc(100vh - 100px);
  margin-left: 40px;
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 3fr 8fr;
  width: 100%;
  height: calc(100vh - 100px);
  margin-bottom: 20px;
  @media screen and (max-width: 1024px) {
    grid-template-columns: none;
    grid-template-rows: auto 70vh;
    height: auto;
    ${Cover} {
      width: 180px;
    }
    ${Data} {
      justify-self: center;
      text-align: center;
      margin-left: 0;
      width: 100%;
      max-width: 85vw;
      margin: 20px 0px;
    }
    ${Overview} {
      width: 100%;
      text-align: center;
    }
  }
  @media screen and (max-width: 480px) {
    ${Title} {
      font-size: 30px;
    }
    ${Data} {
      max-width: 75vw;
    }
  }
`;

const Divider = styled.span`
  margin: 0px 10px;
  opacity: 0.8;
  font-weight: 200;
  font-size: 15px;
`;

const SFontAwesomeIcon = styled(FontAwesomeIcon)`
  font-size: 18px;
  margin-left: 10px;
`;

interface IProps {
  result: MovieDetail | TVDetail | null;
}

const DetailInfo = ({ result }: IProps) => {
  const { pathname } = useLocation();
  const isMovie = pathname.includes("movie");
  const date = isMovieDetail(result)
    ? result.release_date
    : result?.first_air_date;

  return (
    <Content>
      <Cover
        src={
          result?.poster_path
            ? `https://image.tmdb.org/t/p/w500${result?.poster_path}`
            : "/noImg.png"
        }
      />
      <Data>
        <TitleContainer>
          <Title>{isMovieDetail(result) ? result.title : result?.name}</Title>
          {isMovieDetail(result) && result.imdb_id && (
            <a
              href={`https://www.imdb.com/title/${result.imdb_id}`}
              target="blank"
            >
              <SFontAwesomeIcon icon={faImdb} />
            </a>
          )}
        </TitleContainer>
        <BasicData>{isMovie ? "영화" : "TV 프로그램"}</BasicData>
        <Divider>|</Divider>
        <BasicData>
          {isMovieDetail(result)
            ? result.original_title
            : result?.original_name}
        </BasicData>
        <Divider>|</Divider>
        <BasicData>{date ? date.substring(0, 4) : "연도 정보 없음"}</BasicData>
        <DetailTabs />
      </Data>
    </Content>
  );
};

export default DetailInfo;
