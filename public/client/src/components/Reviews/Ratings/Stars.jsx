import React from 'react';
import Rating from 'react-rating';

const Stars = () => (
  <div>
    <Rating initialRating={3.5} fractions={4} readonly />
  </div>
);

export default Stars;
