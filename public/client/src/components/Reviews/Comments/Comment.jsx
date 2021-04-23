/* eslint-disable react/prop-types */
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Rating from '@material-ui/lab/Rating';

const Comment = ({ review }) => {
  if (review) {
    return (
      <Container fluid className="review">
        <style type="text/css">
          {`
            .response {background-color: #D3D3D3}
            .review {border-bottom: 2px solid black}
            .underline {text-decoration: underline}
          `}
        </style>
        <Row>
          <Col xs="10">
            {/* <Stars size={'medium'}/> */}
            <Rating
              // style={{color: 'grey'}}
              defaultValue={review.rating}
              precision={0.25}
              size="small"
              readOnly
            />
          </Col>
          <Col lg="auto">
            <p>
              {review.reviewer_name}
              ,&nbsp;
              {
                new Date(review.date)
                  .toLocaleString('default',
                    { month: 'long', day: 'numeric', year: 'numeric' })
              }
            </p>
          </Col>
        </Row>
        {/* <Container fluid> */}
        <h3>{review.summary.slice(0, 61)}</h3>
        <p>{review.body}</p>
        {review.recommend === true ? <p>I recommend this product</p> : <p />}
        {
          review.response !== null || '' ? (
            <Container className="response">
              <p><strong>Response:</strong></p>
              <p>{review.response}</p>
            </Container>
          ) : <p />
        }
        <Row>
          <span>Helpful?&nbsp;</span>
          <span className="underline">Yes</span>
          <span>
            &nbsp;
            {review.helpfulness}
          </span>
          <span>&nbsp;|&nbsp;</span>
          <span className="underline">No</span>
          <span>&nbsp;|&nbsp;</span>
          <span className="underline">Report</span>
        </Row>
      </Container>
    );
  }

  return <div />;
};

export default Comment;
