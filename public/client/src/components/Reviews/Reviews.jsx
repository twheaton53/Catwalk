import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Ratings from './Ratings/Ratings';
import RatingDistribution from './Ratings/RatingDistribution';
import SizeDistribution from './Ratings/SizeDistribution';
import DropdownList from './Comments/Dropdown';
import CommentList from './Comments/CommentList';

const Reviews = () => (
  <Container fluid>
    <Row>
      <Col> Ratings &amp; Reviews </Col>
    </Row>
    <Row>
      <Col xs={6} md={4}>
        <span>
          {/* Container for review stars */}
          <Ratings />
        </span>
        <span>
          {/* Container for rating distributions */}
          <RatingDistribution />
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

export default Reviews;
