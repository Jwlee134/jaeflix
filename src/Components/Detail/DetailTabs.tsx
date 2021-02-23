import React, { useState } from "react";
import styled from "styled-components";
import BasicInfo from "./BasicInfo";
import Credits from "./Credits";
import Videos from "./Videos";

const Li = styled.li<{ selected: boolean }>`
  font-size: 20px;
  font-weight: 300;
  padding: 10px;
  cursor: pointer;
  background-color: ${(props) =>
    props.selected ? "rgba(0, 0, 0, 0.4)" : "none"};
  border-top-left-radius: ${(props) => (props.selected ? "10px" : "none")};
  border-top-right-radius: ${(props) => (props.selected ? "10px" : "none")};
  @media screen and (max-width: 479px) {
    font-size: 16px;
  }
`;

const ItemContainer = styled.div<{ selected: boolean }>`
  width: 100%;
  max-width: 100%;
  overflow: auto;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  padding: 20px;
  border-radius: 10px;
  border-top-left-radius: ${(props) => (props.selected ? "0px" : "10px")};
  ::-webkit-scrollbar {
    width: 17px;
  }
  ::-webkit-scrollbar-thumb {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: rgba(255, 255, 255, 0.7);
    background-clip: padding-box;
    border-radius: 20px;
    border: 5px solid transparent;
  }
  ::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0);
  }
  @media screen and (max-width: 1024px) {
    ::-webkit-scrollbar {
      display: none;
    }
  }
`;

const Ul = styled.ul`
  display: flex;
  margin-top: 30px;
`;

const DetailTabs = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const tabs = ["기본 정보", "참여", "동영상"];
  return (
    <>
      <Ul>
        <Li selected={currentTab === 0} onClick={() => setCurrentTab(0)}>
          {tabs[0]}
        </Li>
        <Li selected={currentTab === 1} onClick={() => setCurrentTab(1)}>
          {tabs[1]}
        </Li>
        <Li selected={currentTab === 2} onClick={() => setCurrentTab(2)}>
          {tabs[2]}
        </Li>
      </Ul>
      <ItemContainer selected={currentTab === 0}>
        {currentTab === 0 && <BasicInfo />}
        {currentTab === 1 && <Credits />}
        {currentTab === 2 && <Videos />}
      </ItemContainer>
    </>
  );
};

export default DetailTabs;
