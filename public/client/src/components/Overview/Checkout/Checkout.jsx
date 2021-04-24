/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect, useRef } from 'react';
import {
  DropdownButton, Container, Row, Col, Dropdown, Button, Overlay,
} from 'react-bootstrap';

const Checkout = ({ currentStyle }) => {
  const { skus } = currentStyle;
  const target = useRef(null);
  const [stock, setStock] = useState({
    sizes: [],
    quantity: [],
    currentSize: '',
    selectedQuantity: null,
    currentQuantity: [],
  });
  const [showAlert, setShowAlert] = useState(false);
  const [added, setAdded] = useState(false);

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
    if (showAlert) {
      setShowAlert(false);
    }
  };

  useEffect(() => {
    setStock({
      ...stock,
      sizes: Object.values(skus).map((v) => v.size),
      quantity: Object.values(skus).map((v) => v.quantity),
    });
  }, [skus]);

  return (
    <Container className="checkout-section">
      <Row className="checkout-row1">
        <Col md={8}>

          <DropdownButton
            variant="outline-secondary"
            id="size-select"
            title={stock.currentSize || 'Select Size'}
            drop="down"
            onSelect={handleSelect}
          >
            {stock.sizes.map((s, index) => (
              <Dropdown.Item eventKey={index} key={index}>{s}</Dropdown.Item>
            ))}
          </DropdownButton>

        </Col>
        <Col md={4}>
          <DropdownButton
            variant="outline-secondary"
            id="quantity-select"
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
      <Row>
        <Col>
          <Button
            id="add-cart"
            variant="outline-primary"
            size="lg"
            ref={target}
            disabled={!stock.currentSize}
            onClick={
          () => {
            if (!stock.selectedQuantity) {
              document.getElementById('quantity-select').click();
              setShowAlert(true);
            } else {
              setAdded(true);
            }
          }
        }
          >
            Add to cart
          </Button>
          <Overlay target={target.current} show={showAlert || added} placement="bottom">
            {({
              placement, arrowProps, show: _show, popper, ...props
            }) => (
              <div
                {...props}
                style={{
                  backgroundColor: showAlert ? 'rgba(255, 100, 100, 0.85)' : 'rgba(34,139,34, 0.75)',
                  padding: '2px 10px',
                  margin: '5px',
                  color: 'white',
                  borderRadius: 3,
                  ...props.style,
                }}
              >
                {showAlert && 'select a quantity'}
                {added && 'added to cart'}
              </div>
            )}
          </Overlay>
        </Col>
      </Row>
    </Container>
  );
};

export default Checkout;
