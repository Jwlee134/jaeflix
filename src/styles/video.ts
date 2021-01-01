import styled from "styled-components";

export const Name = styled.div`
  font-size: 18px;
  font-weight: 500;
  line-height: 1.3;
`;

export const Container = styled.div`
  padding: 0px 10px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 30px;
  @media screen and (max-width: 600px) {
    ${Name} {
      font-size: 16px;
      font-weight: 400;
    }
  }
  @media screen and (max-width: 500px) {
    ${Name} {
      font-size: 12px;
    }
    display: block;
  }
`;

export const VideoContainer = styled.div`
  text-align: center;
`;

export const Img = styled.img`
  width: 100%;
  margin: 15px 0px;
  border-radius: 10px;
`;

export const NoVideos = styled.div`
  font-size: 14px;
  opacity: 0.8;
`;