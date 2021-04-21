import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Rating from '@material-ui/lab/Rating';

const Comment = () => (

  <Container fluid className="review">
    <style type="text/css">
      {`
        .response {background-color: #D3D3D3}
        .review {border-bottom: 2px solid black}
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
      <Col md="auto">
        <p>User info + date</p>
      </Col>
    </Row>
    {/* <Container fluid> */}
    <h3>On Wednesdays we wear pink</h3>
    <p>So fetch!</p>
    <p>Helpful button</p>
    <Container className="response">
      <p><strong>Response:</strong></p>
      <p>Stop trying to make fetch happen!</p>
    </Container>
    {/* </Container> */}
  </Container>
);

export default Comment;