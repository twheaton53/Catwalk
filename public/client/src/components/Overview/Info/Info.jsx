import React from 'react';

// price will actually come from styles

const Info = ({ product }) => (
  <div className="product-info">
    <h6>{product.category}</h6>
    <h2>{product.name}</h2>
    <p>{`$${product.default_price}`}</p>
  </div>
);

export default Info;
