import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Container = styled.div`
  padding-bottom: 30px;
`;

const Title = styled.div`
  font-size: 20px;
  @media screen and (max-width: 550px) {
    text-align: center;
  }
`;

const StyledSlider = styled(Slider)`
  margin: 25px;
  .slick-slide {
    padding: 0px 10px;
  }
  .slick-track {
    margin-left: 0;
  }
`;

const Section = ({ title, children, isPeople = false }) => {
  const settings = {
    infinite: false,
    swipeToSlide: true,
    centerPadding: "60px",
    slidesToShow: isPeople ? 7 : 9,
    speed: 500,
    slidesToScroll: 5,
    responsive: [
      {
        breakpoint: 1800,
        settings: {
          slidesToShow: isPeople ? 6 : 8,
        },
      },
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: isPeople ? 5 : 7,
        },
      },
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: isPeople ? 4 : 6,
        },
      },
      {
        breakpoint: 1150,
        settings: {
          slidesToShow: isPeople ? 3 : 5,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: isPeople ? 4 : 5,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 400,
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
  isPeople: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default Section;
