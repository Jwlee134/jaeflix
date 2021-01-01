import React from "react";
import { Container, Text } from "styles/message";

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
