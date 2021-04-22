import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Reviews from '../Reviews/Reviews';
import Info from '../Info/Info';

const Details = ({ product }) => {
  const { currentProduct, currentStyle } = product;
  return (
    <Container>
      <Row>
        <Reviews />
      </Row>
      <Row>
        <Info product={currentProduct} />
      </Row>
    </Container>
  );
};

export default Details;
