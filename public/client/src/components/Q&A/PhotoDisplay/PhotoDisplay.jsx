/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Image } from 'react-bootstrap';

const photoStyle = {
  height: '100px',
  width: '100px',
};

const PhotoDisplay = ({ pictures }) => {
  const [lightBoxDisplay, setLightBoxDisplay] = useState(false);
  const [imageToShow, setImageToShow] = useState('');
  const images = [];

  const showImage = (image) => {
    // Setting image to show which one has been clicked
    setImageToShow(image);

    // Set Lightbox visibility to true
    setLightBoxDisplay(true);
  };

  const hideLightBox = () => {
    setLightBoxDisplay(false);
  };

  const showNext = (e) => {
    e.stopPropagation();
    console.log(images);

    const currentIndex = images.indexOf(imageToShow);

    if (currentIndex >= images.length - 1) {
      setLightBoxDisplay(false);
    } else {
      const nextImage = images[currentIndex + 1];
      setImageToShow(nextImage);
    }
  };

  const showPrev = (e) => {
    e.stopPropagation();

    const currentIndex = images.indexOf(imageToShow);

    if (currentIndex <= 0) {
      setLightBoxDisplay(false);
    } else {
      const nextImage = images[currentIndex - 1];
      setImageToShow(nextImage);
    }
  };

  const imageCards = pictures.map((image, index) => {
    images.push(image.url);
    return (
      <Image className="image-card" key={index} style={photoStyle} onClick={() => showImage(image.url)} alt="" src={image.url} thumbnail />
    );
  });

  return (
    <>
      <div>{imageCards}</div>
      { lightBoxDisplay
        ? (
          <div id="lightbox" onClick={hideLightBox} onKeyDown={hideLightBox}>
            <button type="button" onClick={showPrev}>⭠</button>
            <Image id="lightbox-img" src={imageToShow} />
            <button type="button" onClick={showNext}>⭢</button>
          </div>
        )
        : '' }
    </>
  );
};

export default PhotoDisplay;

// return (
//   <>
//     {pictures.map((pic) => (
//       <a target="_blank" rel="noreferrer" href={pic.url}>
//         <Image src={pic.url} style={photoStyle} alt="Thumbnail" thumbnail />
//         {photoArray.push(pic.url)}
//         {console.log(photoArray)}
//       </a>
//     ))}
//   </>
// );
