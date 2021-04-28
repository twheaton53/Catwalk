import React from 'react';

// price will actually come from styles

const Info = ({ product }) => {
  const { currentProduct, currentStyle } = product;

  return (
    <div className="product-info">
      <div style={{ fontSize: '2vw' }}>{currentProduct.category}</div>
      <h2 style={{ fontSize: '3vw' }}>{currentProduct.name}</h2>
      <p style={{
        fontSize: '1.5vw',
        textDecoration: currentStyle.sale_price && 'line-through',
        margin: '0px',
      }}
      >
        {`$${currentStyle.original_price}`}
      </p>
      <p style={{
        fontSize: '1.5vw',
        color: 'red',
        margin: '0px',
      }}
      >
        {currentStyle.sale_price && `$${currentStyle.sale_price}`}
      </p>
    </div>
  );
};

export default Info;
