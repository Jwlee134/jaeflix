import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Container = styled.div`
  margin-bottom: 50px;
`;

const Title = styled.span`
  font-size: 20px;
`;

const Grid = styled.div`
  margin: 25px;
`;

const StyledSlider = styled(Slider)`
  .slick-slide {
    padding: 0px 10px;
  }
`;

const Section = ({ title, children }) => {
  console.log(children);
  const settings = {
    infinite: false,
    swipeToSlide: true,
    centerPadding: "60px",
    slidesToShow: 7,
    speed: 500,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 6,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 500,
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
      <Grid>
        <StyledSlider {...settings}>{children}</StyledSlider>
      </Grid>
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
