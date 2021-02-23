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

const SubtitleContainer = styled.div``;

const Title = styled.span`
  font-size: 40px;
`;

const BasicData = styled.span`
  opacity: 0.8;
  font-size: 15px;
  font-weight: 300;
`;

const Data = styled.div`
  width: 60vw;
  margin-left: 40px;
  display: flex;
  flex-direction: column;
  height: 100%;
  max-height: calc(100vh - 130px);
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

const Content = styled.div`
  display: grid;
  grid-template-columns: 3fr 8fr;
  height: 100%;
  margin-bottom: 50px;
  @media screen and (max-width: 1024px) {
    grid-template-columns: none;
    grid-template-rows: auto 100vh;
    margin-bottom: 20px;
    ${Cover} {
      width: 250px;
      height: 100%;
    }
    ${Data} {
      margin-top: 40px;
      margin-left: 0;
      width: calc(100vw - 77px);
      min-height: calc(100vh - 40px);
    }
    ${Title} {
      font-size: 30px;
    }
    ${TitleContainer}, ${SubtitleContainer} {
      text-align: center;
    }
  }
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
        <SubtitleContainer>
          <BasicData>{isMovie ? "영화" : "TV 프로그램"}</BasicData>
          <Divider>|</Divider>
          <BasicData>
            {isMovieDetail(result)
              ? result.original_title
              : result?.original_name}
          </BasicData>
          <Divider>|</Divider>
          <BasicData>
            {date ? date.substring(0, 4) : "연도 정보 없음"}
          </BasicData>
        </SubtitleContainer>
        <DetailTabs />
      </Data>
    </Content>
  );
};

export default DetailInfo;
