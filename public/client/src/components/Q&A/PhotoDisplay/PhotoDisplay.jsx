/* eslint-disable react/prop-types */
import React from 'react';
import { Image } from 'react-bootstrap';

const photoStyle = {
  height: '100px',
  width: '100px',
};

const PhotoDisplay = ({ pictures }) => (
  <>
    {pictures.map((pic) => (
      <a target="_blank" rel="noreferrer" href={pic.url}>
        <Image src={pic.url} style={photoStyle} alt="Thumbnail" thumbnail />
      </a>
    ))}
  </>
);

export default PhotoDisplay;
