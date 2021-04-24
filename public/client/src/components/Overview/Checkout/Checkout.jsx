/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import {
  DropdownButton, Container, Row, Col, Dropdown, Button,
} from 'react-bootstrap';

const Checkout = ({ currentStyle }) => {
  const { skus } = currentStyle;
  const [stock, setStock] = useState({
    sizes: [],
    quantity: [],
    currentSize: '',
    selectedQuantity: null,
    currentQuantity: [],
  });

  const handleSelect = (e) => {
    const size = stock.quantity[e];
    const sizeList = [];
    for (let i = 1; i <= size; i += 1) {
      sizeList.push(i);
    }
    setStock({
      ...stock,
      selectedQuantity: null,
      currentSize: stock.sizes[e],
      currentQuantity: sizeList.slice(0, 15),
    });
  };

  const handleQuantity = (e) => {
    setStock({
      ...stock,
      selectedQuantity: e,
    });
  };

  useEffect(() => {
    setStock({
      ...stock,
      sizes: Object.values(skus).map((v) => v.size),
      quantity: Object.values(skus).map((v) => v.quantity),
    });
  }, [skus]);

  return (
    <Container>
      <Row className="checkout-row1">
        <Col>
          <DropdownButton
            id="dropdown-basic-button"
            title={stock.currentSize || 'Select Size'}
            onSelect={handleSelect}
          >
            {stock.sizes.map((s, index) => (
              <Dropdown.Item eventKey={index} key={index}>{s}</Dropdown.Item>
            ))}
          </DropdownButton>
        </Col>
        <Col>
          <DropdownButton
            id="dropdown-basic-button"
            title={stock.selectedQuantity || '-'}
            onSelect={handleQuantity}
          >
            {stock.currentQuantity.length && stock.currentQuantity.map((num) => (
              <Dropdown.Item eventKey={num} key={num}>{num}</Dropdown.Item>
            ))}
          </DropdownButton>
        </Col>
      </Row>
      <Col>
        <Button disabled={!stock.currentSize}>Add to cart</Button>
      </Col>
      <Row />
    </Container>
  );
};

export default Checkout;
