import React, { useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Reviews from '../Reviews/Reviews';
import Info from '../Info/Info';
import Styles from '../Styles/Styles';
import Checkout from '../Checkout/Checkout';
import Socials from '../Socials/Socials';
import ProductInfo from '../../../store/product';

const Details = ({ product, newStyle }) => {
  const { currentProduct, currentStyle, styles } = product;
  const ctx = useContext(ProductInfo);
  const { rating } = ctx;
  return (
    <Container>
      {rating > 0 && (
      <Row>
        <Reviews />
      </Row>
      )}
      <Row>
        <Info product={product} />
      </Row>
      <Row>
        <Styles product={product} newStyle={newStyle} />
      </Row>
      <Row>
        <Checkout currentStyle={currentStyle} />
      </Row>
      <Row style={{ marginTop: '5vh' }}>
        <Socials />
      </Row>
    </Container>
  );
};

export default Details;
