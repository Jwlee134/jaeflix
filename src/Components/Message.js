import React from "react";
import PropTypes from "prop-types";
import { Container, Text } from "styles/message";

const Message = ({ text }) => (
  <Container>
    <Text>오류가 발생했습니다.</Text>
    <Text>{text}</Text>
  </Container>
);

Message.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Message;
