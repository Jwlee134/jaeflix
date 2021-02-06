import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0px 20px;
`;

const Text = styled.div`
  font-size: 20px;
  font-weight: 300;
  color: #95a5a6;
  line-height: 1.2;
`;

interface IProps {
  text: string;
}

const Message = ({ text }: IProps) => (
  <Container>
    <Text>{text}</Text>
  </Container>
);

export default Message;
