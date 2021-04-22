import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Comment from './Comment';

const CommentList = ({ reviews }) => {
  const { results } = reviews;

  if (results) {
    return (
      <div>
        <Container fluid>
          {/* <Row>
            <Comment />
          </Row> */}
          {
            results.map((review) => (
              <Row>
                <Comment review={review} key={review.review_id} />
              </Row>
            ))
          }
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
  }

  return <div />;
};

export default CommentList;
