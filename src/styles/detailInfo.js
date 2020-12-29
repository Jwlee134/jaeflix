import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Cover = styled.img`
  max-width: 100%;
  max-height: 100%;
  z-index: 1;
  border-radius: 10px;
  margin: 0 auto;
`;

export const TitleContainer = styled.div`
  margin-bottom: 15px;
`;

export const Title = styled.span`
  font-size: 40px;
`;

export const Overview = styled.p`
  opacity: 0.8;
  line-height: 1.8;
  width: 90%;
`;

export const BasicData = styled.span`
  opacity: 0.8;
  font-size: 15px;
  font-weight: 300;
`;

export const Data = styled.div`
  width: 60vw;
  max-height: calc(100vh - 100px);
  margin-left: 40px;
`;

export const ItemContainer = styled.div`
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

export const Ul = styled.ul`
  display: flex;
  margin-top: 30px;
`;

export const Li = styled.li`
  font-size: 20px;
  font-weight: 300;
  padding: 10px;
  background-color: ${(props) =>
    props.selected ? "rgba(0, 0, 0, 0.4)" : "none"};
  border-top-left-radius: ${(props) => (props.selected ? "10px" : "none")};
  border-top-right-radius: ${(props) => (props.selected ? "10px" : "none")};
`;

export const Content = styled.div`
  display: grid;
  grid-template-columns: 3fr 8fr;
  width: 100%;
  height: calc(100vh - 100px);
  margin-bottom: 20px;
  @media screen and (max-width: 1000px) {
    grid-template-columns: none;
    grid-template-rows: auto 100vh;
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
      height: 80%;
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

export const Divider = styled.span`
  margin: 0px 10px;
  opacity: 0.8;
  font-weight: 200;
  font-size: 15px;
`;

export const SFontAwesomeIcon = styled(FontAwesomeIcon)`
  font-size: 18px;
  margin-left: 10px;
`;
