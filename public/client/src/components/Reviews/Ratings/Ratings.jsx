/* eslint-disable react/prop-types */
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Rating from '@material-ui/lab/Rating';

const Ratings = ({ reviews }) => {
  const { results } = reviews;
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  let totalRatings = 0;
  let averageRatings = 0;
  if (results) {
    totalRatings = results.map((review) => review.rating).reduce(reducer, totalRatings);
    averageRatings = (totalRatings / results.length).toFixed(2);
  }
  // console.log('Loading review list', results);
  // console.log('ratings', totalRatings);
  // console.log('Average rating', averageRatings);

  if (results) {
    return (
      <Container>
        <Row>
          <Col xs={6} md={2}>
            <h2>{averageRatings}</h2>
          </Col>
          <Col>
            <Rating
            // style={{color: 'grey'}}
              defaultValue={averageRatings}
              precision={0.25}
              size="small"
              readOnly
            />
          </Col>
        </Row>
      </Container>
    );
  }

  return <div />;
};

export default Ratings;
