import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Item, List, SHeader, SLink } from "styles/header";

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
