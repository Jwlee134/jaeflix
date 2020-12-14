import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Container = styled.div`
  padding-bottom: 30px;
`;

const Title = styled.span`
  font-size: 20px;
`;

const StyledSlider = styled(Slider)`
  margin: 25px;
  .slick-slide {
    padding: 0px 10px;
  }
`;

const Section = ({ title, children }) => {
  const settings = {
    infinite: false,
    swipeToSlide: true,
    centerPadding: "60px",
    slidesToShow: 9,
    speed: 500,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1800,
        settings: {
          slidesToShow: 8,
        },
      },
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 7,
        },
      },
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 6,
        },
      },
      {
        breakpoint: 1150,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };
  return (
    <Container>
      <Title>{title}</Title>
      <StyledSlider {...settings}>{children}</StyledSlider>
    </Container>
  );
};

Section.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default Section;
