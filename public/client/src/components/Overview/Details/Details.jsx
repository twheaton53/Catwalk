import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Reviews from '../Reviews/Reviews';
import Info from '../Info/Info';
import Styles from '../Styles/Styles';
import Checkout from '../Checkout/Checkout';

const Details = ({ product, newStyle }) => {
  const { currentProduct, currentStyle, styles } = product;
  return (
    <Container>
      <Row>
        <Reviews />
      </Row>
      <Row>
        <Info product={product} />
      </Row>
      <Row>
        <Styles product={product} newStyle={newStyle} />
      </Row>
      <Row>
        <Checkout currentStyle={currentStyle} />
      </Row>
    </Container>
  );
};

export default Details;
