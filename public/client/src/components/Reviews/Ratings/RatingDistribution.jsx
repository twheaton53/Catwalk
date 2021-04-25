/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext } from 'react';
import { Container } from 'react-bootstrap';
import { Chart } from 'react-google-charts';

const filterMapper = new Map();
filterMapper.set(0, 5);
filterMapper.set(1, 4);
filterMapper.set(2, 3);
filterMapper.set(3, 2);
filterMapper.set(4, 1);

const RatingDistribution = ({ reviews, starFilter }) => {
  const [filter, setFilter] = useState(starFilter);
  const chartEvents = [
    {
      eventName: 'select',
      callback({ chartWrapper }) {
        console.log('Selected ', chartWrapper.getChart().getSelection());
        console.log('Value', chartWrapper.getChart().getSelection()[0].row);
        console.log('Calling map value', filterMapper.get(chartWrapper.getChart().getSelection()[0].row));
        setFilter(starFilter.push(filterMapper.get(chartWrapper.getChart().getSelection()[0].row)));
      },
    },
  ];
  const { results } = reviews;
  let totalReviews = 0;
  let recommendedCount = 0;
  let oneStar = 0;
  let twoStar = 0;
  let threeStar = 0;
  let fourStar = 0;
  let fiveStar = 0;
  let recommendedRatio = 0;
  if (results !== undefined) {
    totalReviews = results.length;
    results.forEach((review) => {
      if (review.recommend) {
        recommendedCount += 1;
      }
      switch (review.rating) {
        case 1:
          oneStar += 1;
          break;
        case 2:
          twoStar += 1;
          break;
        case 3:
          threeStar += 1;
          break;
        case 4:
          fourStar += 1;
          break;
        case 5:
          fiveStar += 1;
          break;
        default:
          break;
      }
    });
    recommendedRatio = recommendedCount / totalReviews;
    if (Number.isNaN(recommendedRatio)) {
      recommendedRatio = 0;
    }
  }

  if (results) {
    return (
      <Container>
        <Chart
          width="500px"
          height="25%"
          chartType="BarChart"
          loader={<div>Loading Chart</div>}
          data={[
            ['Stars', 'Ratings', 'Other Ratings'],
            ['5 Stars', fiveStar, (totalReviews - fiveStar)],
            ['4 Stars', fourStar, (totalReviews - fourStar)],
            ['3 Stars', threeStar, (totalReviews - threeStar)],
            ['2 Stars', twoStar, (totalReviews - twoStar)],
            ['1 Stars', oneStar, (totalReviews - oneStar)],
          ]}
          options={{
            title: `${(recommendedRatio * 100).toFixed(2)}% of reviews recommended this product`,
            titleTextStyle: { fontSize: 12 },
            chartArea: { left: '10%', width: '60%' },
            colors: ['00CC33', '#D3D3D3'],
            legend: { position: 'none' },
            hAxis: {
              minValue: 0,
              ticks: [0, 0.25, 0.5, 0.75, 1],
            },
            isStacked: 'percent',
            animation: {
              startup: true,
              easing: 'linear',
              duration: 2000,
            },
          }}
          chartEvents={chartEvents}
        />
      </Container>
    );
  }

  return <div />;
};

export default RatingDistribution;
