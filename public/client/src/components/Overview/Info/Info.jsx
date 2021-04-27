import React from 'react';

// price will actually come from styles

const Info = ({ product }) => {
  const { currentProduct, currentStyle } = product;

  return (
    <div className="product-info">
      <h6 style={{ fontSize: '2vw' }}>{currentProduct.category}</h6>
      <h2 style={{ fontSize: '4vw' }}>{currentProduct.name}</h2>
      <p style={{ fontSize: '1.5vw' }}>{`$${currentStyle.original_price}`}</p>
    </div>
  );
};

export default Info;
