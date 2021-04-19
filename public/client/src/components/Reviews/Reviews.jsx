import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Reviews = () => (
  <Container fluid>
    <Row>
      <Col> Ratings and Reviews </Col>
    </Row>
    <Row>
      <Col xs={6} md={4}> Container for review stars</Col>
      <Col>Container for comment section</Col>
    </Row>
  </Container>
);

export default Reviews;
