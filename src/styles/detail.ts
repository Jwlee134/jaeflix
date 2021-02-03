import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  width: 100%;
  position: relative;
  padding: 30px;
  padding-top: 100px;
  @media screen and (max-width: 400px) {
    padding-left: 30px;
    padding-right: 30px;
  }
  span {
    line-height: 1.2;
  }
`;

export const Backdrop = styled.div<{ bgImg: string }>`
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.bgImg});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: -1;
`;
