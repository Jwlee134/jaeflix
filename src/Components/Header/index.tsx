import React, { useEffect, useRef, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import styled from "styled-components";

const SHeader = styled.header<{ scroll: boolean }>`
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
  transition: transform 0.2s ease-in-out;
  transform: ${(props) =>
    props.scroll ? "translateY(0px)" : "translateY(-60px)"};
`;

const List = styled.ul`
  display: flex;
`;

const Item = styled.li<{ current: boolean }>`
  width: 80px;
  height: 50px;
  text-align: center;
  border-bottom: 3px solid
    ${(props) => (props.current ? "#3498db" : "transparent")};
  transition: border-bottom 0.3s ease-in-out;
`;

const SLink = styled(Link)`
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Header = () => {
  const { pathname } = useLocation();
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const prev = useRef(0);

  const handleScroll = () => {
    if (prev.current > window.pageYOffset) {
      setIsScrollingUp(true);
    } else if (prev.current < window.pageYOffset) {
      setIsScrollingUp(false);
    }
    prev.current = window.pageYOffset;
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <SHeader scroll={isScrollingUp}>
      <List>
        <Item current={pathname === "/"}>
          <SLink to="/">영화</SLink>
        </Item>
        <Item current={pathname === "/tv"}>
          <SLink to="/tv">TV</SLink>
        </Item>
        <Item current={pathname === "/search"}>
          <SLink to="/search">검색</SLink>
        </Item>
      </List>
    </SHeader>
  );
};

export default Header;
