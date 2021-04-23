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
  // const styleChoice = (style) => {
  //   // pass this down to style selection module
  //   console.log(style);
  // };
  const expandedView = () => {
    setExpanded(true);
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
          <Col xs={expanded ? 12 : 7}>
            <Carousel currentStyle={products.currentStyle} expandedView={expandedView} />
          </Col>
          <Col xs={expanded ? 0 : 5} className="product-details">
            {!expanded && <Details product={products} />}
          </Col>
        </Row>
        <Row>
          <Col xs={2} />
          <Col xs={6}>
            <Description currentProduct={products.currentProduct} />
          </Col>
          <Col xs={4} />
        </Row>
      </Container>
    );
  }
  return <div />;
};

export default Overview;
