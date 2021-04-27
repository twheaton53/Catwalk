import React, { useState } from 'react';
import ReactImageMagnify from 'react-image-magnify';
import { Modal, Button } from 'react-bootstrap';

const Zoom = ({ img, setZoom }) => {
  const [show, setShow] = useState(true);
  const handleClose = () => {
    setShow(false);
    setZoom();
  };

  return (
    <div className="zoom">
      <Modal
        show={show}
        onHide={handleClose}
        animation="true"
      >
        <Modal.Body>
          <div className="zoom-container" onClick={handleClose}>
            <ReactImageMagnify {...{
              smallImage: {
                alt: 'Wristwatch by Ted Baker London',
                width: 400,
                height: 580,
                src: img,
              },
              largeImage: {
                src: img,
                width: 1200,
                height: 1800,
              },
              enlargedImageContainerDimensions: {
                width: '125%',
                height: '100%',
              },
              isHintEnabled: true,
              imageClassName: 'zoom-small',
              enlargedImageClassName: 'zoom-large',
              enlargedImagePosition: 'over',
            }}
            />
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Zoom;
