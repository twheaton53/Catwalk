/* eslint-disable react/prop-types */
import React, { useEffect, useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Rating from '@material-ui/lab/Rating';
import ProductInfo from '../../../store/product';

const Ratings = ({ reviews }) => {
  const { results } = reviews;
  const ctx = useContext(ProductInfo);
  const { changeRating } = ctx;
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  let totalRatings = 0;
  let averageRatings = 0;
  if (results !== undefined) {
    totalRatings = results.map((review) => review.rating).reduce(reducer, totalRatings);
    averageRatings = Number((totalRatings / results.length).toFixed(2));
    if (Number.isNaN(averageRatings)) {
      averageRatings = 0;
    }
  }

  useEffect(() => {
    changeRating(averageRatings);
  }, [reviews]);

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
              key={averageRatings}
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
