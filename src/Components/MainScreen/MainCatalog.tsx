import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Movie, TV } from "types";
import { isMovieItem } from "types/typeGuards";

interface StyleProps {
  thumb: boolean;
}

export const SectionTitle = styled.div`
  font-size: 50px;
  display: flex;
  align-items: center;
  font-weight: 600;
`;

export const BackDrop = styled.div<StyleProps>`
  border-radius: 5px;
  width: 100%;
  height: ${(props) => (props.thumb ? "20vh" : "calc(100vh - 50px);")};
  z-index: -1;
  padding: 0px 70px;
  padding-top: 50px;
  @media screen and (max-height: 700px) {
    height: ${(props) => (props.thumb ? "25vh" : "calc(100vh - 50px);")};
  }
`;

export const SectionData = styled.div`
  display: flex;
  justify-content: space-between;
  height: 58vh;
  align-items: flex-end;
  padding: 0px 20px;
  @media screen and (max-height: 800px) {
    height: 55vh;
  }
  @media screen and (max-height: 700px) {
    height: 45vh;
  }
  @media screen and (max-height: 600px) {
    height: 40vh;
  }
`;

export const FirstColumn = styled.div`
  width: 50%;
`;

export const SecondColumn = styled.div`
  width: 43%;
  font-size: 25px;
  line-height: 1.5;
  font-weight: 400;
  position: relative;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
`;

export const ContentTitle = styled.div`
  font-size: 40px;
  font-weight: 400;
  margin-bottom: 20px;
  line-height: 1.3;
`;

export const ContentData = styled.div`
  font-size: 30px;
  font-weight: 200;
  color: #ecf0f1;
`;

export const GoDetail = styled.div`
  margin-top: 20px;
  font-size: 25px;
  color: white;
  text-decoration: underline;
`;

export const Title = styled.div`
  position: absolute;
  bottom: 0;
  height: 20%;
  font-size: 17px;
  display: flex;
  align-items: center;
  margin: 10px;

  line-height: 1.3;
`;

const Container = styled.div`
  position: relative;
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -2;
    object-fit: cover;
  }
`;

const MainCatalog = ({
  content,
  isShow,
  isThumbnail = false,
}: {
  content: Movie | TV;
  isShow: boolean;
  isThumbnail?: boolean;
}) => {
  const handlePreload = () => {
    if (content.poster_path) {
      const img = new Image();
      img.src = `https://image.tmdb.org/t/p/w500${content.poster_path}`;
    }
  };

  return (
    <Container>
      {!isThumbnail ? (
        <>
          <img
            src={
              content.backdrop_path
                ? `https://image.tmdb.org/t/p/w1280${content.backdrop_path}`
                : "/noImg.png"
            }
            alt=""
          />
          <BackDrop thumb={false}>
            <SectionTitle>
              {isShow ? "현재 방영중" : "현재 상영중"}
            </SectionTitle>
            <SectionData>
              <FirstColumn>
                <ContentTitle>
                  {isMovieItem(content) ? content.title : content.name}
                </ContentTitle>
                <ContentData>
                  <span>
                    {!isMovieItem(content) &&
                      !content.first_air_date &&
                      "연도 정보 없음"}
                    {isMovieItem(content) &&
                      !content.release_date &&
                      "연도 정보 없음"}
                    {isMovieItem(content)
                      ? content.release_date.substring(0, 4)
                      : content.first_air_date.substring(0, 4)}
                  </span>
                  <span> · </span>
                  <span>
                    {content.vote_average
                      ? `평점 ${content.vote_average}`
                      : "평점 정보 없음"}
                  </span>
                </ContentData>
                <Link
                  to={isShow ? `/tv/${content.id}` : `/movie/${content.id}`}
                >
                  <GoDetail onClick={handlePreload}>상세 보기</GoDetail>
                </Link>
              </FirstColumn>
              <SecondColumn>{content.overview}</SecondColumn>
            </SectionData>
          </BackDrop>
        </>
      ) : (
        <>
          <img
            src={
              content.backdrop_path
                ? `https://image.tmdb.org/t/p/w1280${content.backdrop_path}`
                : "/noImg.png"
            }
            alt=""
            style={{ borderRadius: "5px" }}
          />
          <BackDrop thumb={true} />
          <Title>{isMovieItem(content) ? content.title : content.name}</Title>
        </>
      )}
    </Container>
  );
};

export default MainCatalog;
