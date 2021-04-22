import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Ratings from './Ratings/Ratings';
import RatingDistribution from './Ratings/RatingDistribution';
import SizeDistribution from './Ratings/SizeDistribution';
import DropdownList from './Comments/Dropdown';
import CommentList from './Comments/CommentList';
import ProductInfo from '../../store/product';
import config from '../../../../../config/config';

const options = {
  url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax',
  headers: {
    Authorization: `${config.TOKEN}`,
  },
};

const Reviews = () => {
  const ctx = useContext(ProductInfo);
  const { id } = ctx;

  const [reviews, setReviews] = useState({
    currentProductID: null,
    reviewsList: [],
    results: [],
  });

  useEffect(() => {
    if (!id) return;
    (async () => {
      const reviewsList = await axios({
        method: 'get',
        url: `${options.url}/reviews/`,
        params: {
          page: 1,
          count: 20,
          sort: 'relevant',
          product_id: id,
        },
        headers: options.headers,
      });
      setReviews({
        currentProductID: reviewsList.data.product,
        reviewsList: reviewsList.data.results,
        results: reviewsList.data,
      });
    })();
  }, [id]);

  if (reviews.results) {
    return (
      <Container fluid>
        <Row>
          <Col> Ratings &amp; Reviews </Col>
        </Row>
        <Row>
          <Col xs={6} md={4}>
            <span>
              {/* Container for review stars */}
              <Ratings reviews={reviews.results} />
            </span>
            <span>
              {/* Container for rating distributions */}
              <RatingDistribution reviews={reviews.results} />
            </span>
            <span>
              {/* Container for size distributions */}
              <SizeDistribution />
            </span>
          </Col>
          <Col>
            <Container>
              {/* Container for comment section */}
              {/* <span>
                248 reviews, sorted by
                <option> relavance </option>
              </span> */}
              <DropdownList />
              <CommentList />
            </Container>
          </Col>
        </Row>
      </Container>
    );
  }
  return <div />;
};

export default Reviews;
