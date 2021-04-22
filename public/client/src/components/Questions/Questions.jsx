import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Questions = () => (
  <Container fluid>
    <Row>
      <Col>Questions and Answers</Col>
      {/* Make this a child component? */}
    </Row>
    <Row>
      <Col>Question Goes Here</Col>
      {/* Another child component */}
    </Row>
    <Row>
      <Col>Answer Goes Here</Col>
      {/* Hmmm maybe too many child components */}
    </Row>
  </Container>
);

export default Questions;
