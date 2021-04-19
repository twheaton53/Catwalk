import React, { useState, useEffect } from 'react';
import axios from 'axios';

const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products';

const Overview = () => {
  const [product, setProduct] = useState([]);
  useEffect(() => {
    axios.get(url, {
      headers: {
        Authorization: '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',
      },
    })
      .then((data) => {
        console.log(data);
      });
  }, []);
  return (
    <div></div>
  );
};

export default Overview;
