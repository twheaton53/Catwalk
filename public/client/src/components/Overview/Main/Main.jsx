/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Description from '../Description/Description';
import Carousel from '../Carousel/Carousel';

const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products';
const auth = {
  headers: {
    Authorization: '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',
  },
};

const Overview = () => {
  const [products, setProducts] = useState({
    allProducts: [],
    currentProduct: null,
    styles: [],
    currentStyle: [],
  });
  const styleChoice = (style) => {
    // pass this down to style selection module
    console.log(style);
  };
  useEffect(() => {
    (async () => {
      const productsList = await axios.get(url, auth);
      const currentId = productsList.data[0].id;
      const productDetail = await axios.get(`${url}/${currentId}`, auth);
      const productStyles = await axios.get(`${url}/${currentId}/styles`, auth);
      setProducts({
        allProducts: productsList.data,
        currentProduct: productDetail.data,
        styles: productStyles.data.results,
        currentStyle: productStyles.data.results[0],
      });
    })();
  }, []);

  if (products.allProducts.length) {
    return (
      <div id="overview">
        <Carousel currentStyle={products.currentStyle} />
        <Description currentProduct={products.currentProduct} />
      </div>
    );
  }
  return <div />;
};

export default Overview;
