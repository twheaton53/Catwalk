import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Stars from './Stars';

const Ratings = () => (
  <Container>
    <Row>
      <Col xs={6} md={2}>
        <h2>3.75</h2>
      </Col>
      <Col>
        <Stars />
      </Col>
    </Row>
  </Container>
);

export default Ratings;
