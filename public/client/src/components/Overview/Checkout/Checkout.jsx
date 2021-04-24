/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect, createRef } from 'react';
import {
  DropdownButton, Container, Row, Col, Dropdown, Button, ButtonToolbar,
} from 'react-bootstrap';

const Checkout = ({ currentStyle }) => {
  const { skus } = currentStyle;
  const numDrop = createRef();
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
            variant="secondary"
            id="dropdown-basic-button"
            title={stock.currentSize || 'Select Size'}
            drop="down"
            onSelect={handleSelect}
          >
            {stock.sizes.map((s, index) => (
              <Dropdown.Item eventKey={index} key={index}>{s}</Dropdown.Item>
            ))}
          </DropdownButton>

        </Col>
        <Col>
          <DropdownButton
            variant="secondary"
            id="dropdown-basic-button"
            className="quantity-select"
            ref={numDrop}
            drop="down"
            title={stock.selectedQuantity || '-'}
            onSelect={handleQuantity}
            disabled={!stock.currentSize}
          >
            {stock.currentQuantity.length && stock.currentQuantity.map((num) => (
              <Dropdown.Item eventKey={num} key={num}>{num}</Dropdown.Item>
            ))}
          </DropdownButton>
        </Col>
      </Row>
      <Col>
        <Button
          disabled={!stock.currentSize}
          onClick={
          () => {
            const el = document.querySelector('.test-button');
            console.log(el);
            el.click();
          }
        }
        >
          Add to cart
        </Button>
      </Col>
      <Row />
    </Container>
  );
};

export default Checkout;
