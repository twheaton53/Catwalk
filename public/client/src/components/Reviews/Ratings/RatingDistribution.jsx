/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext } from 'react';
import { Container, Button } from 'react-bootstrap';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { Chart } from 'react-google-charts';

const filterMapper = new Map();
filterMapper.set(0, 5);
filterMapper.set(1, 4);
filterMapper.set(2, 3);
filterMapper.set(3, 2);
filterMapper.set(4, 1);

const RatingDistribution = ({ reviews, starFilter, filterStar }) => {
  const [filter, setFilter] = useState(starFilter);
  const chartEvents = [
    {
      eventName: 'select',
      callback({ chartWrapper }) {
        const star = filterMapper.get(chartWrapper.getChart().getSelection()[0].row);
        if (starFilter.includes(star)) {
          const index = starFilter.indexOf(star);
          const poppedStar = starFilter.splice(index, 1);
          setFilter(poppedStar);
        } else {
          setFilter(
            starFilter.push(star),
          );
        }
        filterStar(starFilter.sort());
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

  const handleClear = () => {
    console.log('Clicked');
    console.log('Filter', starFilter);
    filterStar([]);
  };

  const displayClear = () => (
    <Button className="review-submit" variant="outline-dark" size="sm" onClick={() => filterStar([])}>Clear filter</Button>
  );

  const displayFilter = () => {
    if (starFilter.length > 0) {
      return (
        <ButtonGroup size="sm">
          {
            starFilter.map(
              (star) => (
                <Button variant="outline-dark">
                  {star}
                  &nbsp;
                  stars
                </Button>
              ),
            )
          }
        </ButtonGroup>
      );
    }
  };

  if (results) {
    return (
      <Container>
        {displayFilter()}
        {starFilter.length > 0 ? displayClear() : <p />}
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
              duration: 2500,
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
