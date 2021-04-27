import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Ratings from './Ratings/Ratings';
import RatingDistribution from './Ratings/RatingDistribution';
import ProductDistribution from './Ratings/ProductDistribution';
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
  const [filter, setFilter] = useState([]);

  const [reviews, setReviews] = useState({
    currentProductID: null,
    results: [],
    filterStar: [],
    sort: 'relevant',
  });

  const [sort, setSort] = useState(reviews.sort);

  const filterStar = (starFilter) => {
    setReviews({
      ...reviews,
      filterStar: starFilter,
    });
  };

  useEffect(() => {
    if (!id) return;
    (async () => {
      const reviewsList = await axios({
        method: 'get',
        url: `${options.url}/reviews/`,
        params: {
          page: 1,
          count: 20,
          sort: reviews.sort,
          // product_id: id,
          product_id: 16057,
        },
        headers: options.headers,
      });
      setReviews({
        currentProductID: reviewsList.data.product,
        results: reviewsList.data,
      });
    })();
  }, [id]);

  const changeReview = (option) => {
    setSort(option);
    (async () => {
      const reviewsList = await axios({
        method: 'get',
        url: `${options.url}/reviews/`,
        params: {
          page: 1,
          count: 20,
          sort: option,
          // product_id: id,
          product_id: 16057,
        },
        headers: options.headers,
      });
      setReviews({
        currentProductID: reviewsList.data.product,
        results: reviewsList.data,
      });
    })();
  };

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
              <RatingDistribution
                reviews={reviews.results}
                starFilter={filter}
                filterStar={filterStar}
              />
            </span>
            <span>
              {/* Container for size distributions */}
              <ProductDistribution />
            </span>
          </Col>
          <Col>
            <Container>
              {/* Container for comment section */}
              {/* <span>
                248 reviews, sorted by
                <option> relavance </option>
              </span> */}
              <DropdownList reviews={reviews.results} changeReview={changeReview} />
              <CommentList reviews={reviews.results} starFilter={filter} />
            </Container>
          </Col>
        </Row>
      </Container>
    );
  }
  return <div />;
};

export default Reviews;
