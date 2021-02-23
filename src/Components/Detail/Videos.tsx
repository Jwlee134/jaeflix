import React from "react";
import { useSelector } from "react-redux";

import { RootState } from "store";

import styled from "styled-components";

const Name = styled.div`
  font-size: 16px;
  font-weight: 500;
  line-height: 1.3;
`;

const Container = styled.div`
  padding: 0px 10px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 30px;
  @media screen and (max-width: 479px) {
    display: block;
  }
`;

const VideoContainer = styled.div`
  text-align: center;
`;

const Video = styled.iframe`
  width: 100%;
  margin: 15px 0px;
  border-radius: 10px;
`;

const NoVideos = styled.div`
  font-size: 14px;
  opacity: 0.8;
`;

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
              <Video
                src={`https://www.youtube.com/embed/${video.key}`}
                height="220"
                allowFullScreen
              />
              <Name>{video.name}</Name>
            </VideoContainer>
          ))}
      </Container>
      {videos?.length === 0 && <NoVideos>등록된 동영상이 없습니다.</NoVideos>}
    </>
  );
};

export default Videos;
