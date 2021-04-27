import React from 'react';

const ProductInfo = React.createContext({
  id: null,
  name: null,
  starFilter: [],
  sort: 'relevant',
});

export default ProductInfo;
