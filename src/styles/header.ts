import { Link } from "react-router-dom";
import styled from "styled-components";

export const SHeader = styled.header<{ scroll: boolean }>`
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  background-color: rgba(20, 20, 20, 0.8);
  z-index: 10;
  box-shadow: 0px 1px 5px 2px rgba(0, 0, 0, 0.8);
  transition: all 0.2s linear;
  transform: ${(props) =>
    props.scroll ? "translateY(0px)" : "translateY(-50px)"};
`;

export const List = styled.ul`
  display: flex;
`;

export const Item = styled.li<{ current: boolean }>`
  width: 80px;
  height: 50px;
  text-align: center;
  border-bottom: 3px solid
    ${(props) => (props.current ? "#3498db" : "transparent")};
  transition: border-bottom 0.3s ease-in-out;
`;

export const SLink = styled(Link)`
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
