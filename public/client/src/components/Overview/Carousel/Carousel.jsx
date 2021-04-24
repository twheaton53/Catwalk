/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa';
import { BsFullscreenExit } from 'react-icons/bs';
import { Container, Row, Col } from 'react-bootstrap';

const Carousel = ({ currentStyle, expandedView }) => {
  const { photos } = currentStyle;
  const [current, setCurrent] = useState(0);
  const [defaultView, setDefaultView] = useState(true);
  const nextSlide = () => {
    setCurrent(current < photos.length - 1 && current + 1);
  };
  const previousSlide = () => {
    setCurrent(current > 0 && current - 1);
  };
  const handleThumbClick = (id) => {
    setCurrent(id);
  };

  const collapseView = () => {
    setDefaultView(true);
    expandedView();
  };

  const handleImageClick = () => {
    if (defaultView) {
      expandedView();
      setDefaultView(false);
    } else {
      console.log('in expanded view');
    }
  };

  return (
    <Container>
      <Row>
        <Col xs={2} className="thumb-col">
          <div className="thumb-container">
            {photos.map((photo, index) => (
              <div className="thumbnails" key={index}>
                <img
                  src={photo.thumbnail_url}
                  alt="thumbnail"
                  className="thumb"
                  onClick={() => handleThumbClick(index)}
                  style={{ transform: index === current && 'scale(1.2)' }}
                />
              </div>
            ))}
          </div>

        </Col>

        <Col className="img-gallery" xs={10}>
          <div className="image-container">
            <div className="arrows">
              <FaArrowCircleLeft className="left-arrow" onClick={previousSlide} style={{ visibility: current > 0 ? 'visible' : 'hidden' }} />
              <FaArrowCircleRight className="right-arrow" onClick={nextSlide} style={{ visibility: current < photos.length - 1 ? 'visible' : 'hidden' }} />
            </div>
            {photos.map((photo, index) => (
              <div className={index === current ? 'slide active' : 'slide'} key={index}>
                <div className="fs-exit-container">
                  {!defaultView && <BsFullscreenExit id="fs-exit" onClick={collapseView} />}
                </div>
                {index === current && (<img src={photo.url} alt="main" className="main-image" onClick={handleImageClick} />)}
              </div>
            ))}
          </div>

        </Col>
      </Row>
    </Container>
  );
};

export default Carousel;
