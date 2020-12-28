import React from "react";
import PropTypes from "prop-types";
import { Container, Text } from "styles/message";

const Message = ({ text }) => (
  <Container>
    <Text>{text}</Text>
  </Container>
);

Message.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Message;
