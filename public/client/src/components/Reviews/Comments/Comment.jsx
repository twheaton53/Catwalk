import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Rating from '@material-ui/lab/Rating';

const Comment = () => (

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
          defaultValue={4.5}
          precision={0.25}
          size="small"
          readOnly
        />
      </Col>
      <Col lg="auto">
        <p>User info + date</p>
      </Col>
    </Row>
    {/* <Container fluid> */}
    <h3>On Wednesdays we wear pink</h3>
    <p>So fetch!</p>
    <p>I recommend this product</p>
    <Container className="response">
      <p><strong>Response:</strong></p>
      <p>Stop trying to make fetch happen!</p>
    </Container>
    <Row>
      <span>Helpful?&nbsp;</span>
      <span className="underline">Yes</span>
      <span>&nbsp;9</span>
      <span>&nbsp;|&nbsp;</span>
      <span className="underline">Report</span>
    </Row>
  </Container>
);

export default Comment;
