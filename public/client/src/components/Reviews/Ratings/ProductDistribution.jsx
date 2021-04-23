/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Chart } from 'react-google-charts';
import axios from 'axios';
import ProductInfo from '../../../store/product';
import config from '../../../../../../config/config';

const options = {
  url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax',
  headers: {
    Authorization: `${config.TOKEN}`,
  },
};

const ProductDistribution = () => {
  const ctx = useContext(ProductInfo);
  const { id } = ctx;

  const [products, setProducts] = useState({
    currentProductID: null,
    traitsList: [],
  });

  useEffect(() => {
    if (!id) return;
    (async () => {
      const reviewsList = await axios({
        method: 'get',
        url: `${options.url}/reviews/meta`,
        params: {
          product_id: id,
        },
        headers: options.headers,
      });
      setProducts({
        currentProductID: reviewsList.data.product_id,
        traitsList: reviewsList.data.characteristics,
      });
    })();
  }, [id]);

  const dataSchema = [
    'ID', 'Satisfaction', 'Axis', 'Trait', 'Density',
  ];
  let counter = 1;
  const data = [dataSchema];
  if (products.traitsList) {
    for (let [key, value] of Object.entries(products.traitsList)) {
      const traitData = [key, Number.parseFloat(value.value), counter++, key, 0.5];
      data.push(traitData);
    }
  }

  if (products.traitsList) {
    return (
      <Container>
        <Chart
          width={'auto'}
          height={'50%'}
          chartType="BubbleChart"
          data={data}
          options={{
            title:
              'Customer satisfaction ratings',
            hAxis: {
              title: 'Average Rating',
              minValue: 1,
              maxValue: 5,
              ticks: [
                { v: 1, f: 'Poor' },
                { v: 2, f: 'Fair' },
                { v: 3, f: 'Average' },
                { v: 4, f: 'Good' },
                { v: 5, f: 'Great' },
              ],
            },
            vAxis: {
              minValue: 0,
              maxValue: 5,
              textPosition: 'none',
              bubble: {
                textStyle: { fontSize: 11 },
                opacity: 0.5,
              },
              chartArea: { left: '0px', width: '60%' },
            } }
          }
        />
      </Container>
    );
  }

  return <div />;
};

export default ProductDistribution;
