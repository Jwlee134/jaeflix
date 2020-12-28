import styled from "styled-components";

export const Container = styled.div`
  padding: 0px 30px;
  padding-bottom: 30px;
  .swiper-wrapper {
    margin-top: 20px;
  }
  .swiper-button-next,
  .swiper-button-prev {
    color: rgba(255, 255, 255, 0.8);
  }
  .swiper-button-disabled {
    opacity: 0;
  }
  @media screen and (max-width: 500px) {
    padding: 10px 10px;
  }
  @media screen and (max-width: 700px) {
    .swiper-button-next,
    .swiper-button-prev {
      display: none;
    }
  }
`;

export const Title = styled.div`
  font-size: 20px;
  @media screen and (max-width: 500px) {
    text-align: center;
  }
`;
