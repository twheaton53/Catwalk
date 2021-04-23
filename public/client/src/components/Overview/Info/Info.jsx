import React from 'react';

// price will actually come from styles

const Info = ({ product }) => {
  const { currentProduct, currentStyle } = product;

  return (
    <div className="product-info">
      <h6>{currentProduct.category}</h6>
      <h2>{currentProduct.name}</h2>
      <p>{`$${currentStyle.original_price}`}</p>
    </div>
  );
};

export default Info;
