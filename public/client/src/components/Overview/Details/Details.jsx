import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Reviews from '../Reviews/Reviews';
import Info from '../Info/Info';
import Styles from '../Styles/Styles'

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
      <Row>
        <Styles currentStyle={currentStyle} />
      </Row>
    </Container>
  );
};

export default Details;
