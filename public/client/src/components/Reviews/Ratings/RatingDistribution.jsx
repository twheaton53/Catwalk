import React from 'react';
import { Container } from 'react-bootstrap';
import { Chart } from 'react-google-charts';

const RatingDistribution = () => (
  <Container>
    {/* <p>Barchart container</p> */}
    <Chart
      width="500px"
      height="25%"
      chartType="BarChart"
      loader={<div>Loading Chart</div>}
      data={[
        ['Stars', 'Ratings', 'Other Ratings'],
        ['5 Stars', 100, (380 - 100)],
        ['4 Stars', 80, (380 - 80)],
        ['3 Stars', 150, (380 - 150)],
        ['2 Stars', 50, (380 - 50)],
        ['1 stars', 30, (380 - 30)],
      ]}
      options={{
        title: '100% of reviews recommended this product',
        titleTextStyle: { fontSize: 12 },
        chartArea: { left: '10%', width: '60%' },
        colors: ['00CC33', '#D3D3D3'],
        legend: { position: 'none' },
        isStacked: 'percent',
      }}
    />
  </Container>
);

export default RatingDistribution;
