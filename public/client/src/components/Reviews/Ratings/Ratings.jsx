import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Stars from './Stars';

const Ratings = () => (
  <Container>
    <Row>
      <Col xs={6} md={4}>
        3.5
      </Col>
      <Col>
        <Stars />
      </Col>
    </Row>
  </Container>
);

export default Ratings;
