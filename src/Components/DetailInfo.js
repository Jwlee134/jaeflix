import React from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import BasicInfo from "./BasicInfo";
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
import Credits from "./Credits";
import Videos from "./Videos";

const DetailInfo = ({ result }) => {
  const { pathname } = useLocation();
  const {
    id,
    poster_path: imgUrl,
    title,
    name,
    original_title,
    original_name,
    release_date,
    first_air_date,
    imdbId,
  } = result;
  const date = release_date ? release_date : first_air_date;
  const selected = pathname === `/movie/${id}` || pathname === `/tv/${id}`;
  const credits =
    pathname === `/movie/${id}/credits` || pathname === `/tv/${id}/credits`;
  const videos =
    pathname === `/movie/${id}/videos` || pathname === `/tv/${id}/videos`;
  const isMovie = pathname.includes("/movie/");
  return (
    <Content>
      <Cover
        src={imgUrl ? `https://image.tmdb.org/t/p/w500${imgUrl}` : "/noImg.png"}
      />
      <Data>
        <TitleContainer>
          <Title>{title ? title : name}</Title>
          {imdbId && (
            <a href={`https://www.imdb.com/title/${imdbId}`} target="blank">
              <SFontAwesomeIcon icon={faImdb} />
            </a>
          )}
        </TitleContainer>
        <BasicData>
          {pathname.includes("/movie/") ? "영화" : "TV 프로그램"}
        </BasicData>
        <Divider>|</Divider>
        <BasicData>{original_title ? original_title : original_name}</BasicData>
        <Divider>|</Divider>
        <BasicData>{date ? date.substring(0, 4) : "연도 정보 없음"}</BasicData>
        <Ul>
          <Li selected={selected}>
            <Link to={isMovie ? `/movie/${id}` : `/tv/${id}`}>기본 정보</Link>
          </Li>
          <Li selected={pathname.includes("credits")}>
            <Link to={isMovie ? `/movie/${id}/credits` : `/tv/${id}/credits`}>
              참여
            </Link>
          </Li>
          <Li selected={pathname.includes("videos")}>
            <Link to={isMovie ? `/movie/${id}/videos` : `/tv/${id}/videos`}>
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

DetailInfo.propTypes = {
  id: PropTypes.number,
  imgUrl: PropTypes.string,
  title: PropTypes.string,
  originTitle: PropTypes.string,
  date: PropTypes.string,
  genres: PropTypes.array,
  overview: PropTypes.string,
  rating: PropTypes.number,
  casts: PropTypes.array,
  crews: PropTypes.array,
  imdbId: PropTypes.string,
  countries: PropTypes.array,
  companies: PropTypes.array,
};

export default DetailInfo;
