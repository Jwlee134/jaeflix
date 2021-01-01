import React from "react";
import { Link, useLocation } from "react-router-dom";

import { MovieDetailItems, TVDetailItems } from "types";

import BasicInfo from "./BasicInfo";
import Credits from "./Credits";
import Videos from "./Videos";

import { faImdb } from "@fortawesome/free-brands-svg-icons";
import {
  BasicData,
  Content,
  Cover,
  Data,
  Divider,
  ItemContainer,
  Li,
  SFontAwesomeIcon,
  Title,
  TitleContainer,
  Ul,
} from "styles/detailInfo";
import { isMovieDetail } from "types/typeGuards";

interface IProps {
  result: MovieDetailItems | TVDetailItems | null;
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
          {result?.imdbId && (
            <a
              href={`https://www.imdb.com/title/${result?.imdbId}`}
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
