import React from 'react';
import { Container } from 'react-bootstrap';
import { Chart } from 'react-google-charts';

const RatingDistribution = ( { reviews } ) => {
  const { results } = reviews;
  let totalReviews = 0;
  let recommendedCount = 0;
  let oneStar = 0;
  let twoStar = 0;
  let threeStar = 0;
  let fourStar = 0;
  let fiveStar = 0;
  if (results) {
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
  }

  if (results) {
    return (
      <Container>
        {/* <p>Barchart container</p> */}
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
            ['1 stars', oneStar, (totalReviews - oneStar)],
          ]}
          options={{
            title: `${((recommendedCount / totalReviews) * 100).toFixed(2)}% of reviews recommended this product`,
            titleTextStyle: { fontSize: 12 },
            chartArea: { left: '10%', width: '60%' },
            colors: ['00CC33', '#D3D3D3'],
            legend: { position: 'none' },
            isStacked: 'percent',
          }}
        />
      </Container>
    );
  }

  return <div />;
};

export default RatingDistribution;
