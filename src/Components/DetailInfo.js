import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import BasicInfo from "./BasicInfo";
import Credits from "./Credits";
import Videos from "./Videos";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImdb } from "@fortawesome/free-brands-svg-icons";

const Cover = styled.img`
  width: 100%;
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

const ItemContainer = styled.div`
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

const Li = styled.li`
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
  margin-bottom: 50px;
  @media screen and (max-width: 1000px) {
    grid-template-columns: none;
    grid-template-rows: 35vh 75vh;
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
  @media screen and (max-width: 500px) {
    margin-bottom: 0px;
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
  @media screen and (max-width: 400px) {
    ${Overview} {
      font-size: 10px;
      width: 100%;
    }
    ${Li} {
      font-size: 14px;
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
