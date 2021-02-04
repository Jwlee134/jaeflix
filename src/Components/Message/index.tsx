import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  text-align: center;
`;

const Text = styled.div`
  font-size: 30px;
  font-weight: 300;
  color: #95a5a6;
  margin-bottom: 20px;
`;

interface IProps {
  text: string;
}

const Message = ({ text }: IProps) => (
  <Container>
    <Text>오류가 발생했습니다.</Text>
    <Text>{text}</Text>
  </Container>
);

export default Message;
