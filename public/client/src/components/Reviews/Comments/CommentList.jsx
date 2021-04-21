import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Comment from './Comment';

const CommentList = () => (
  <div>
    <Container fluid>
      <Row>
        <Comment />
      </Row>
      <Row>
        <Comment />
      </Row>
      <Row>
        <span>
          <Button className="load-more" variant="outline-dark" size="lg" type="submit"> MORE REVIEWS </Button>
          &nbsp;&nbsp;&nbsp;
          <Button className="review-submit" variant="outline-dark" size="lg" type="submit">ADD A REVIEW +</Button>
        </span>
      </Row>
    </Container>
  </div>
);

export default CommentList;
