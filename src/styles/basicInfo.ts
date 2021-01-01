import styled from "styled-components";

export const Overview = styled.div`
  margin-top: 15px;
  line-height: 1.7;
  opacity: 0.8;
  font-size: 14px;
`;

export const Container = styled.div`
  @media screen and (max-width: 400px) {
    ${Overview},span {
      font-size: 13px;
    }
  }
`;

export const Ul = styled.ul`
  border-left: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 3px;
  padding-left: 10px;
`;

export const Li = styled.div`
  :not(:last-child) {
    margin-bottom: 10px;
  }
  font-size: 14px;
`;

export const Title = styled.span`
  margin-right: 10px;
  opacity: 0.6;
`;
