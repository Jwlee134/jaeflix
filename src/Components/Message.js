import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  text-align: center;
`;

const Text = styled.span`
  font-size: 30px;
  font-weight: 300;
  color: #95a5a6;
`;

const Message = ({ text }) => (
  <Container>
    <Text>{text}</Text>
  </Container>
);

Message.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Message;
