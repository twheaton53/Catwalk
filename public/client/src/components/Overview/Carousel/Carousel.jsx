/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa';
import { Container, Row, Col } from 'react-bootstrap';

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
    <Container className="img-gallery">
      <Row>
        <Col className="thumbnails" xs={2}>
          {photos.map((photo, index) => (
            <img
              src={photo.thumbnail_url}
              alt="thumbnail"
              className="thumb"
              onClick={() => handleThumbClick(index)}
              style={{ transform: index === current && 'scale(1.2)' }}
            />
          ))}
        </Col>
        <Col xs={10} className="image-container">
          {current < photos.length - 1 && <FaArrowCircleRight className="right-arrow" onClick={nextSlide} />}
          {current > 0 && <FaArrowCircleLeft className="left-arrow" onClick={previousSlide} />}
          {photos.map((photo, index) => (
            <div className={index === current ? 'slide active' : 'slide'} key={index}>
              {index === current && (<img src={photo.url} alt="main" className="main-image" />)}
            </div>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default Carousel;
