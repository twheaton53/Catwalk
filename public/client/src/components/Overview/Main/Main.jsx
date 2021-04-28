/* eslint-disable no-console */
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import Description from '../Description/Description';
import Carousel from '../Carousel/Carousel';
import ProductInfo from '../../../store/product';
import Details from '../Details/Details';
import config from '../../../../../../config/config';

const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products';
const auth = {
  headers: {
    Authorization: config.TOKEN,
  },
};

const Overview = () => {
  const ctx = useContext(ProductInfo);
  const { id } = ctx;

  const [products, setProducts] = useState({
    currentProduct: null,
    styles: [],
    currentStyle: [],
  });
  const [expanded, setExpanded] = useState(false);

  const newStyle = (style) => {
    setProducts({
      ...products,
      currentStyle: products.styles[style],
    });
  };

  const expandedView = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    if (!id) return;
    (async () => {
      const productDetail = await axios.get(`${url}/${id}`, auth);
      const productStyles = await axios.get(`${url}/${id}/styles`, auth);
      setProducts({
        currentProduct: productDetail.data,
        styles: productStyles.data.results,
        currentStyle: productStyles.data.results[0],
      });
    })();
  }, [id]);

  if (products.styles.length) {
    return (
      <Container fluid>
        <Row className="main-row">
          <Col xs={expanded ? 12 : 8} className="img-carousel">
            <Carousel currentStyle={products.currentStyle} expandedView={expandedView} />
          </Col>
          <Col xs={expanded ? 0 : 4} className="product-details">
            {!expanded && <Details product={products} newStyle={newStyle} />}
          </Col>
        </Row>
        <Row>
          <Col xs={3} />
          <Col xs={4}>
            <Description currentProduct={products.currentProduct} />
          </Col>
          <Col xs={5} />
        </Row>
      </Container>
    );
  }
  return <div />;
};

export default Overview;
