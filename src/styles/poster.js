import styled from "styled-components";

export const Container = styled.div``;

export const Img = styled.div`
  background-image: url(${(props) => props.bgUrl});
  width: 100%;
  height: 300px;
  background-size: ${(props) => (props.isCompany ? "contain" : "cover")};
  background-repeat: no-repeat;
  background-position: center center;
  border-radius: 5px;
  transition: opacity 0.1s linear;
  @media screen and (max-width: 2001px) {
    height: 300px;
  }
  @media screen and (max-width: 1901px) {
    height: 280px;
  }
  @media screen and (max-width: 1801px) {
    height: 260px;
  }
  @media screen and (max-width: 1701px) {
    height: 240px;
  }
  @media screen and (max-width: 1601px) {
    height: 220px;
  }
  @media screen and (max-width: 1501px) {
    height: 200px;
  }
  @media screen and (max-width: 1401px) {
    height: 220px;
  }
  @media screen and (max-width: 1301px) {
    height: 200px;
  }
  @media screen and (max-width: 1201px) {
    height: 180px;
  }
  @media screen and (max-width: 1101px) {
    height: 160px;
  }
  @media screen and (max-width: 1001px) {
    height: 200px;
  }
  @media screen and (max-width: 901px) {
    height: 180px;
  }
  @media screen and (max-width: 801px) {
    height: 220px;
  }
  @media screen and (max-width: 701px) {
    height: 200px;
  }
  @media screen and (max-width: 651px) {
    height: 180px;
  }
  @media screen and (max-width: 601px) {
    height: ${(props) => (props.isContents ? "210px" : "160px")};
  }
  @media screen and (max-width: 551px) {
    height: ${(props) => (props.isContents ? "190px" : "140px")};
  }
  @media screen and (max-width: 501px) {
    height: ${(props) => (props.isContents ? "170px" : "120px")};
  }
  @media screen and (max-width: 451px) {
    height: ${(props) => (props.isContents ? "150px" : "100px")};
  }
  @media screen and (max-width: 401px) {
    height: ${(props) => (props.isContents ? "190px" : "140px")};
  }
  @media screen and (max-width: 351px) {
    height: ${(props) => (props.isContents ? "170px" : "120px")};
  }
`;

export const Text = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Star = styled.div`
  margin-bottom: 3px;
  margin-right: 3px;
`;

export const Rating = styled.div`
  position: absolute;
  bottom: 4px;
  right: 7px;
  opacity: 0;
  transition: opacity 0.1s linear;
  display: flex;
`;

export const Detail = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  position: absolute;
  width: 100%;
  height: 100%;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.1s linear;
`;

export const ImgContainer = styled.div`
  margin-bottom: 10px;
  &:hover {
    ${Detail} {
      opacity: 1;
    }
    ${Rating} {
      opacity: 1;
    }
  }
  position: relative;
`;

export const Title = styled.span`
  display: block;
  padding-bottom: 5px;
  line-height: 1.2;
`;

export const Year = styled.span`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
`;
