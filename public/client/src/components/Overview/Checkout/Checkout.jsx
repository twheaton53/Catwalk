/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect, useRef } from 'react';
import {
  DropdownButton, Container, Row, Col, Dropdown, Button, Overlay,
} from 'react-bootstrap';
import { AiOutlineStar } from 'react-icons/ai';

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
  const [soldOut, setSoldOut] = useState(false);
  const [styleOut, setStyleOut] = useState(false);

  const handleSelect = (e) => {
    const size = stock.quantity[e];
    if (!size) {
      setSoldOut(true);
    } else if (soldOut) {
      setSoldOut(false);
    }
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

  useEffect(() => {
    if (stock.sizes.length) {
      const noSizes = stock.sizes.every((current) => current === null);
      setStyleOut(noSizes);
    }
  }, [stock]);

  return (
    <Container className="checkout-section">
      <Row className="checkout-row1">
        <Col sm={7} className="size-col">

          <DropdownButton
            variant="outline-secondary"
            id="size-select"
            title={stock.currentSize || (styleOut ? 'OUT OF STOCK' : 'Select Size')}
            drop="down"
            onSelect={handleSelect}
            disabled={styleOut}
          >
            {stock.sizes.map((s, index) => (
              <Dropdown.Item eventKey={index} key={index}>{s}</Dropdown.Item>
            ))}
          </DropdownButton>

        </Col>
        <Col sm={5} className="quantity-col">
          <DropdownButton
            variant="outline-secondary"
            id="quantity-select"
            drop="down"
            title={stock.selectedQuantity || (stock.currentSize ? '1' : '-')}
            onSelect={handleQuantity}
            disabled={!stock.currentSize}
          >
            {stock.currentQuantity.length && stock.currentQuantity.map((num) => (
              <Dropdown.Item eventKey={num} key={num}>{num}</Dropdown.Item>
            ))}
          </DropdownButton>
        </Col>
      </Row>
<<<<<<< HEAD
      <Row>
        <Col>
          <DropdownButton id="dropdown-variants-button" title="ADD TO BAG">
            <Dropdown.Item href="#/action-1">So Fetch</Dropdown.Item>
          </DropdownButton>
=======
      <Row className="checkout-row2">
        <Col lg={9} className="cart-col">
          {!soldOut && !styleOut && (
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
          )}
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
                {showAlert && 'Please select size'}
                {added && 'Added to cart'}
              </div>
            )}
          </Overlay>
        </Col>
        <Col lg={3} className="star-col">
          <Button
            id="starred"
            variant="outline-secondary"
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <AiOutlineStar />
          </Button>
>>>>>>> origin
        </Col>
      </Row>
    </Container>
  );
};

export default Checkout;
