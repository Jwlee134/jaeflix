import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import BasicInfo from "./BasicInfo";
import Credits from "./Credits";
import Videos from "./Videos";

const Cover = styled.img`
  width: 100%;
  max-height: 100%;
  z-index: 1;
  border-radius: 5px;
  margin: 0 auto;
`;

const Title = styled.div`
  font-size: 40px;
  margin-bottom: 15px;
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
  max-width: 100%;
  height: calc(100vh - 100px);
  margin-bottom: 50px;
  @media screen and (max-width: 1000px) {
    grid-template-columns: none;
    grid-template-rows: 30vh 75vh;
    height: auto;
    ${Cover} {
      width: auto;
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
    ${Title} {
      font-size: 30px;
    }
    ${Data} {
      max-width: 75vw;
    }
    ${Li} {
      font-size: 17px;
    }
  }
  @media screen and (max-width: 400px) {
    ${Overview} {
      font-size: 10px;
      width: 100%;
    }
    ${Li} {
      font-size: 13px;
    }
  }
`;

const Divider = styled.span`
  margin: 0px 10px;
  opacity: 0.8;
  font-weight: 200;
  font-size: 15px;
`;

const Detail = ({
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
  location: { pathname },
}) => {
  const isMovie = pathname.includes("/movie/");
  return (
    <Content>
      <Cover
        src={imgUrl ? `https://image.tmdb.org/t/p/w500${imgUrl}` : "/noImg.png"}
      />
      <Data>
        <Title>{title}</Title>
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
              감독/출연
            </Link>
          </Li>
          <Li selected={pathname.includes("videos")}>
            <Link to={isMovie ? `/movie/${id}/videos` : `/tv/${id}/videos`}>
              동영상
            </Link>
          </Li>
        </Ul>
        <ItemContainer>
          {pathname === `/movie/${id}` || pathname === `/tv/${id}` ? (
            <BasicInfo
              genres={genres}
              runtime={runtime}
              overview={overview}
              date={date}
              rating={rating}
            />
          ) : pathname.includes("credits") ? (
            <Credits casts={casts} crews={crews} />
          ) : pathname.includes("videos") ? (
            <Videos videos={videos} />
          ) : null}
        </ItemContainer>
      </Data>
    </Content>
  );
};

Detail.propTypes = {
  id: PropTypes.number,
  imgUrl: PropTypes.string,
  title: PropTypes.string,
  originTitle: PropTypes.string,
  date: PropTypes.string,
  runtime: PropTypes.number,
  genres: PropTypes.array,
  overview: PropTypes.string,
  rating: PropTypes.number,
  casts: PropTypes.array,
  crews: PropTypes.array,
};

export default withRouter(Detail);
