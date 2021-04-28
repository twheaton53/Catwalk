/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa';
import { BsFullscreenExit } from 'react-icons/bs';
import { GoPrimitiveDot } from 'react-icons/go';
import { Container, Row, Col } from 'react-bootstrap';
import Zoom from './Zoom';

const Carousel = ({ currentStyle, expandedView }) => {
  const { photos } = currentStyle;
  const [current, setCurrent] = useState(0);
  const [defaultView, setDefaultView] = useState(true);
  const [zoom, setZoom] = useState(false);

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
      // collapseView();
      setZoom(!zoom);
    }
  };

  return (
    <Container>
      <Row>
        <Col xs={defaultView ? 2 : 1} className="thumb-col" style={{ left: defaultView ? '15%' : '10%' }}>
          <div className="thumb-container">
            {photos.map((photo, index) => (
              <div className="thumbnails" key={index}>
                {defaultView && (
                <img
                  src={photo.thumbnail_url || 'https://i.stack.imgur.com/l60Hf.png'}
                  alt="thumbnail"
                  className="thumb"
                  onClick={() => handleThumbClick(index)}
                  style={{ transform: index === current && 'scale(1.2)' }}
                />
                )}
                {!defaultView && !zoom && (
                  <div>
                    <GoPrimitiveDot onClick={() => handleThumbClick(index)} className="thumb-icon" style={{ transform: index === current && 'scale(1.2)' }} />
                  </div>
                )}
              </div>
            ))}
          </div>

        </Col>

        <Col className="img-gallery" xs={defaultView ? 10 : 11}>
          {!zoom && (
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
                {index === current && <img src={photo.url || 'https://i.stack.imgur.com/l60Hf.png'} alt="main" className="main-image" onClick={photo.url && handleImageClick} />}
              </div>
            ))}
          </div>
          )}
          {zoom
            && (
            <Zoom img={photos[current].url} setZoom={setZoom} />
            )}
        </Col>
      </Row>
    </Container>
  );
};

export default Carousel;
