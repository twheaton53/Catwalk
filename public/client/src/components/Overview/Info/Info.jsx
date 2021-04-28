import React from 'react';

// price will actually come from styles

const Info = ({ product }) => {
  const { currentProduct, currentStyle } = product;
  console.log(currentStyle);

  return (
    <div className="product-info">
      <h6 style={{ fontSize: '2vw' }}>{currentProduct.category}</h6>
      <h2 style={{ fontSize: '4vw' }}>{currentProduct.name}</h2>
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
