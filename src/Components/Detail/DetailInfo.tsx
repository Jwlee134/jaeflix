import React from "react";
import { Link, useLocation } from "react-router-dom";

import { MovieDetail, TVDetail } from "types";

import BasicInfo from "./BasicInfo";
import Credits from "./Credits";
import Videos from "./Videos";

import { faImdb } from "@fortawesome/free-brands-svg-icons";
import { isMovieDetail } from "types/typeGuards";

import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

const ItemContainer = styled.div<{ selected: boolean }>`
  width: 100%;
  max-width: 100%;
  height: 70%;
  background-color: rgba(0, 0, 0, 0.4);
  padding: 20px;
  overflow: auto;
  border-radius: 10px;
  border-top-left-radius: ${(props) => (props.selected ? "0px" : "10px")};
  ::-webkit-scrollbar {
    width: 20px;
  }
  ::-webkit-scrollbar-thumb {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: rgba(255, 255, 255, 0.7);
    background-clip: padding-box;
    border-radius: 20px;
    border: 5px solid transparent;
  }
  ::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0);
  }
`;

const Ul = styled.ul`
  display: flex;
  margin-top: 30px;
`;

const Li = styled.li<{ selected: boolean }>`
  font-size: 20px;
  font-weight: 300;
  padding: 10px;
  background-color: ${(props) =>
    props.selected ? "rgba(0, 0, 0, 0.4)" : "none"};
  border-top-left-radius: ${(props) => (props.selected ? "10px" : "none")};
  border-top-right-radius: ${(props) => (props.selected ? "10px" : "none")};
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
    ${ItemContainer} {
      text-align: left;
    }
  }
  @media screen and (max-width: 480px) {
    ${Title} {
      font-size: 30px;
    }
    ${Data} {
      max-width: 75vw;
    }
    ${Li} {
      font-size: 17px;
    }
    ${ItemContainer} {
      ::-webkit-scrollbar {
        width: 0;
      }
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

  const selected =
    pathname === `/movie/${result?.id}` || pathname === `/tv/${result?.id}`;
  const credits =
    pathname === `/movie/${result?.id}/credits` ||
    pathname === `/tv/${result?.id}/credits`;
  const videos =
    pathname === `/movie/${result?.id}/videos` ||
    pathname === `/tv/${result?.id}/videos`;
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
        <Ul>
          <Li selected={selected}>
            <Link to={isMovie ? `/movie/${result?.id}` : `/tv/${result?.id}`}>
              기본 정보
            </Link>
          </Li>
          <Li selected={pathname.includes("credits")}>
            <Link
              to={
                isMovie
                  ? `/movie/${result?.id}/credits`
                  : `/tv/${result?.id}/credits`
              }
            >
              참여
            </Link>
          </Li>
          <Li selected={pathname.includes("videos")}>
            <Link
              to={
                isMovie
                  ? `/movie/${result?.id}/videos`
                  : `/tv/${result?.id}/videos`
              }
            >
              동영상
            </Link>
          </Li>
        </Ul>
        <ItemContainer selected={selected}>
          {selected && <BasicInfo />}
          {credits && <Credits />}
          {videos && <Videos />}
        </ItemContainer>
      </Data>
    </Content>
  );
};

export default DetailInfo;
