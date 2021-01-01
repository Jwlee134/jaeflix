import React from "react";
import { useSelector } from "react-redux";

import { RootState } from "store/reducers";

import { Container, Img, Name, NoVideos, VideoContainer } from "styles/video";

const Videos = () => {
  const { result } = useSelector((state: RootState) => state.detail);

  const videos = result?.videos?.results;

  return (
    <>
      <Container>
        {videos &&
          videos.length > 0 &&
          videos.map((video, index) => (
            <VideoContainer key={index}>
              <a
                href={`https://www.youtube.com/watch?v=${video.key}`}
                target="blank"
              >
                <Img
                  alt={video.id}
                  src={`https://img.youtube.com/vi/${video.key}/0.jpg`}
                />
                <Name>{video.name}</Name>
              </a>
            </VideoContainer>
          ))}
      </Container>
      {videos?.length === 0 && <NoVideos>등록된 동영상이 없습니다.</NoVideos>}
    </>
  );
};

export default Videos;
