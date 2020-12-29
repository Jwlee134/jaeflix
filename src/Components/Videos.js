import React from "react";
import PropTypes from "prop-types";
import { Container, Img, Name, NoVideos, VideoContainer } from "styles/video";
import { useSelector } from "react-redux";

const Videos = () => {
  const {
    result: {
      videos: { results: videos },
    },
  } = useSelector((state) => state.detail);
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
      {videos.length === 0 && <NoVideos>등록된 동영상이 없습니다.</NoVideos>}
    </>
  );
};

Videos.propTypes = {
  videos: PropTypes.array,
};

export default Videos;
