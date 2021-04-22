/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa';
import styled from 'styled-components';
import { Container, Row, Col } from 'react-bootstrap';

const StyledSection = styled.section`
  border: 1px solid #4CAF50;
  position: relative;
  left: 50px;
  width: 45vw;
  height: 65vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .main-image {
    max-height: 100%;
    max-width: 100%;
    aspect-ratio: 3/3;
    object-fit: cover;
    border-radius: 10px;
    margin-left: -75px;
  }

  .slide.active {
    max-height:80%;
    max-width:80%;
    opacity: 1;
    transition-duration: .5s;
    transform: scale(1.04)
  }

  .slide {
    opacity: 0;
    transition-duration: .5s ease;
  }

  .thumb {
    height: 60px;
    width: 60px;
    object-fit: cover;
    border-radius: 10px;
    margin: 4px;
    z-index: 10;
    border: 2px solid white;
    transition: transform .2s;

  }
  .thumb:hover {
    filter: brightness(50%);
    cursor: pointer;
  }

  .thumbnails {
    display: flex;
    flex-direction: column;
    align-items: center;
    left: 5px;
    top: 5px;
  }

  .left-arrow {
    position: absolute;
    font-size: 2rem;
    left: 30px;
    top: 50%;
    cursor: pointer;
    z-index: 10;
    user-select: none;
  }
  .right-arrow {
    position: absolute;
    font-size: 2rem;
    right: 30px;
    top: 50%;
    cursor: pointer;
    z-index: 10;
    user-select: none;
  }
`;

const Carousel = ({ currentStyle }) => {
  const { photos } = currentStyle;
  const [current, setCurrent] = useState(0);
  const nextSlide = () => {
    setCurrent(current < photos.length - 1 && current + 1);
  };
  const previousSlide = () => {
    setCurrent(current > 0 && current - 1);
  };
  const handleThumbClick = (id) => {
    setCurrent(id);
  };

  return (
    <StyledSection>
      <Container>
        <Row>
          <Col className="thumbnails" xs={1}>
            {photos.map((photo, index) => (
              <img
                src={photo.thumbnail_url}
                alt=""
                className="thumb"
                onClick={() => handleThumbClick(index)}
                style={{ transform: index === current && 'scale(1.2)' }}
              />
            ))}
          </Col>
          <Col xs={8}>
            {current < photos.length - 1 && <FaArrowCircleRight className="right-arrow" onClick={nextSlide} />}
            {current > 0 && <FaArrowCircleLeft className="left-arrow" onClick={previousSlide} />}
            {photos.map((photo, index) => (
              <div className={index === current ? 'slide active' : 'slide'} key={index}>
                {index === current && (<img src={photo.url} alt="" className="main-image" />)}
              </div>
            ))}
          </Col>
        </Row>
      </Container>
    </StyledSection>
  );
};

export default Carousel;
