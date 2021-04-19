import React from 'react';
import { Container } from 'react-bootstrap';
import { Chart } from 'react-google-charts';

const RatingDistribution = () => (
  <Container>
    <p>Barchart placeholder</p>
    <Chart
      width="500px"
      height="25%"
      chartType="BarChart"
      loader={<div>Loading Chart</div>}
      data={[
        ['Stars', 'Stars'],
        ['5 Stars', 100],
        ['4 Stars', 80],
        ['3 Stars', 150],
        ['2 Stars', 40],
        ['1 stars', 30],
      ]}
      options={{
        title: '100% reviews recommended this product',
        chartArea: { width: '50%' },
        colors: ['pink'],
        legend: { position: 'none' },
      }}
    />
  </Container>
);

export default RatingDistribution;
