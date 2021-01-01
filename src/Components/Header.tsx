import React from "react";
import { useLocation } from "react-router-dom";
import { Item, List, SHeader, SLink } from "styles/header";

const Header = () => {
  const { pathname } = useLocation();
  return (
    <SHeader>
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
