import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  padding: 0px 10px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 30px;
`;

const VideoContainer = styled.div`
  text-align: center;
`;

const Img = styled.img`
  width: 100%;
  margin: 15px 0px;
  border-radius: 10px;
`;

const Name = styled.div`
  font-size: 18px;
  font-weight: 500;
  line-height: 1.3;
  @media screen and (max-width: 600px) {
    font-size: 16px;
    font-weight: 400;
  }
  @media screen and (max-width: 500px) {
    font-size: 12px;
  }
`;

const NoVideos = styled.div`
  font-size: 14px;
  opacity: 0.8;
`;

const Videos = ({ videos }) => (
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
    {videos.length === 0 && <NoVideos>등록된 동영상이 없습니다.</NoVideos>}
  </>
);

Videos.propTypes = {
  videos: PropTypes.array,
};

export default Videos;
