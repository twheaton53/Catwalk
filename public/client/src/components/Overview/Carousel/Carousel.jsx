import React, { useEffect, useState } from 'react';

const Carousel = ({ currentStyle }) => {
  const { photos } = currentStyle;
  const [image, setImage] = useState(photos[0].url);

  return (
    <img src={image} ></img>
  );
};

export default Carousel;
