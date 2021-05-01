/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React from 'react';

const Features = ({ currentProduct }) => {
  const { features } = currentProduct;
  return (
    <div className="features">
      {features.map((item, index) => (
        <p key={index} style={{ margin: '1px', fontSize: '.85vw' }}>
          {item.feature}
          {' '}
          {item.value && `: ${item.value}`}
        </p>
      ))}
    </div>
  );
};

export default Features;
