/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa';
import styled from 'styled-components';

const StyledSection = styled.section`
  border: 1px solid #4CAF50;
  position: relative;
  width: 60vw;
  height: 75vh;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    height: 600px;
    aspect-ratio: 3/4;
    object-fit: cover;
    border-radius: 10px;
  }
  .arrows {
    width: 600px;
  }
  .left-arrow {
    position: absolute;
    font-size: 2rem;
    right: 150px;
    cursor: pointer;
    z-index: 10;
    user-select: none;
  }

  .right-arrow {
    position: absolute;
    font-size: 2rem;
    left: 150px;
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
  return (
    <StyledSection>
      {current < photos.length - 1 && <FaArrowCircleRight className="right-arrow" onClick={nextSlide} />}
      {current > 0 && <FaArrowCircleLeft className="left-arrow" onClick={previousSlide} />}
      {photos.map((photo, index) => (
        <div className={index === current ? 'slide-active' : 'slide'} key={index}>
          {index === current && (<img src={photo.url} alt="" />)}
        </div>
      ))}
    </StyledSection>
  );
};

export default Carousel;
