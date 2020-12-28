import styled from "styled-components";

export const ThumbsContainer = styled.div`
  position: absolute;
  width: 100%;
  bottom: 0;
  margin-bottom: 10px;
  padding: 0px 10px;
`;

export const Item = styled.div`
  position: relative;
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

export const SectionTitle = styled.div`
  font-size: 50px;
  display: flex;
  align-items: center;
  font-weight: 600;
`;

export const BackDrop = styled.div`
  border-radius: 5px;
  background-image: url(${(props) => props.bgUrl});
  background-position: center center;
  background-size: cover;
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

export const Container = styled.div`
  height: calc(100vh - 50px);
  margin-top: 50px;
  position: relative;
  text-shadow: 0px 0px 4px rgba(0, 0, 0, 1);
  .swiper-container-thumbs {
    .swiper-slide {
      cursor: pointer;
    }
    .swiper-slide-thumb-active {
      border: 2px solid white;
      border-radius: 5px;
      cursor: pointer;
    }
  }
  .swiper-button-next,
  .swiper-button-prev {
    color: rgba(255, 255, 255, 0.8);
  }
  .swiper-button-disabled {
    opacity: 0;
  }
  @media screen and (max-width: 1400px) {
    ${SecondColumn} {
      font-size: 20px;
    }
  }
  @media screen and (max-width: 1200px) {
    ${SecondColumn} {
      font-size: 16px;
    }
    ${SectionData} {
      padding: 0;
    }
  }
  @media screen and (max-width: 750px) {
    ${FirstColumn} {
      width: 100%;
    }
    ${SecondColumn} {
      width: 0%;
      display: none;
    }
    ${ContentTitle} {
      font-size: 30px;
    }
    ${ContentData} {
      font-size: 20px;
    }
    ${GoDetail} {
      font-size: 20px;
    }
  }
  @media screen and (max-width: 600px) {
    ${SectionTitle} {
      justify-content: center;
    }
  }
  @media screen and (max-width: 450px) {
    ${SectionTitle} {
      font-size: 40px;
    }
    ${ContentTitle} {
      font-size: 25px;
    }
    ${ContentData} {
      font-size: 17px;
    }
    ${GoDetail} {
      font-size: 17px;
    }
  }
  @media screen and (max-width: 350px) {
    ${SectionTitle} {
      font-size: 30px;
    }
  }
`;
