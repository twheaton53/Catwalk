/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa';
import { BsFullscreenExit } from 'react-icons/bs';
import { GoPrimitiveDot } from 'react-icons/go';
import { Container, Row, Col } from 'react-bootstrap';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import Zoom from './Zoom';

let scrollId = 0;

const Carousel = ({ currentStyle, expandedView }) => {
  const maxThumbs = 7;
  const { photos } = currentStyle;
  const [current, setCurrent] = useState(0);
  const [defaultView, setDefaultView] = useState(true);
  const [zoom, setZoom] = useState(false);
  const [thumbSelection, setThumbSelection] = useState([]);

  const addId = () => {
    photos.forEach((photo, index) => {
      photo.id = index;
    });
  };
  useEffect(() => {
    addId();
  }, []);

  useEffect(() => {
    const start = current < maxThumbs ? 0 : current - (maxThumbs - 1);
    const end = current < maxThumbs ? maxThumbs : start + maxThumbs;
    const currentThumbs = photos.slice(start, end);

    setThumbSelection(defaultView ? currentThumbs : photos);
  }, [current, defaultView, photos]);

  const thumbScroll = (e) => {
    if (e.target.id === 'down') {
      if (scrollId < (photos.length - maxThumbs)) scrollId += 1;
      if (photos.slice(scrollId, scrollId + maxThumbs).length === maxThumbs) {
        setThumbSelection(defaultView ? photos.slice(scrollId, scrollId + maxThumbs) : photos);
      }
    } else if (e.target.id === 'up' && scrollId > 0) {
      scrollId -= 1;
      setThumbSelection(defaultView ? photos.slice(scrollId, scrollId + maxThumbs) : photos);
    }
  };

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
      setZoom(!zoom);
    }
  };

  return (
    <Container>
      <Row>
        <Col xs={defaultView ? 2 : 1} className="thumb-col" style={{ left: defaultView ? '15%' : '10%' }}>
          <div className="thumb-container">
            {photos.length > maxThumbs && defaultView && (
            <MdKeyboardArrowUp
              id="up"
              className="thumb-scroll"
              onClick={thumbScroll}
              style={{
                visibility: scrollId > 0 ? 'visible' : 'hidden',
              }}
            />
            )}
            {thumbSelection.map((photo, index) => (
              <div className="thumbnails" key={photo.id}>
                {defaultView && (
                <img
                  src={photo.thumbnail_url || 'https://i.stack.imgur.com/l60Hf.png'}
                  alt="thumbnail"
                  className="thumb"
                  onClick={() => handleThumbClick(photo.id)}
                  style={{ transform: photo.id === current && 'scale(1.2)' }}
                />
                )}
                {!defaultView && !zoom && (
                <div>
                  <GoPrimitiveDot onClick={() => handleThumbClick(index)} className="thumb-icon" style={{ transform: index === current && 'scale(1.2)' }} />
                </div>
                )}
              </div>
            ))}
            {photos.length > maxThumbs && defaultView && (
            <MdKeyboardArrowDown
              id="down"
              className="thumb-scroll"
              onClick={thumbScroll}
              style={{
                visibility: scrollId < (photos.length - maxThumbs) ? 'visible' : 'hidden',
              }}
            />
            )}
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
