import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Ratings from './Ratings/Ratings';

const Reviews = () => (
  <Container fluid>
    <Row>
      <Col> Ratings &amp; Reviews </Col>
    </Row>
    <Row>
      <Col xs={6} md={4}>
        Container for review stars
        <span>
          <Ratings />
        </span>
      </Col>
      <Col>Container for comment section</Col>
    </Row>
  </Container>
);

export default Reviews;
