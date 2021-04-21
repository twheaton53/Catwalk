import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Comment from './Comment';
import Stars from '../Ratings/Stars';

const CommentList = () => (
  <div>
    <Container fluid>
      <Row>
        <Comment />
      </Row>
      <Row>
        <Comment />
      </Row>
    </Container>
  </div>
);

export default CommentList;
