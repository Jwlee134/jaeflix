import React from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
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
} from "Styles/DetailInfo";

const DetailInfo = ({
  id,
  imgUrl,
  title,
  originTitle,
  date,
  runtime,
  genres,
  overview,
  rating,
  casts,
  crews,
  videos,
  imdbId,
  countries,
  companies,
  location: { pathname },
}) => {
  const isMovie = pathname.includes("/movie/");
  return (
    <Content>
      <Cover
        src={imgUrl ? `https://image.tmdb.org/t/p/w500${imgUrl}` : "/noImg.png"}
      />
      <Data>
        <TitleContainer>
          <Title>{title}</Title>
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
        <BasicData>{originTitle}</BasicData>
        <Divider>|</Divider>
        <BasicData>{date ? date.substring(0, 4) : "연도 정보 없음"}</BasicData>
        <Ul>
          <Li
            selected={pathname === `/movie/${id}` || pathname === `/tv/${id}`}
          >
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
        <ItemContainer
          selected={pathname === `/movie/${id}` || pathname === `/tv/${id}`}
        >
          {pathname === `/movie/${id}` || pathname === `/tv/${id}` ? (
            <BasicInfo
              genres={genres}
              runtime={runtime}
              overview={overview}
              date={date}
              rating={rating}
              countries={countries}
            />
          ) : pathname.includes("credits") ? (
            <Credits casts={casts} crews={crews} companies={companies} />
          ) : pathname.includes("videos") ? (
            <Videos videos={videos} />
          ) : null}
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

export default withRouter(DetailInfo);
