/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect, useRef, useContext } from 'react';
import {
  DropdownButton, Container, Row, Col, Dropdown, Button, Overlay,
} from 'react-bootstrap';
import { AiOutlineStar } from 'react-icons/ai';
import axios from 'axios';
import config from '../../../../../../config/config';
import ProductInfo from '../../../store/product';

const Checkout = ({ currentStyle }) => {
  const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/cart';
  const { skus } = currentStyle;
  const target = useRef(null);
  const [stock, setStock] = useState({
    sizes: [],
    quantity: [],
    currentSize: '',
    selectedQuantity: null,
    currentQuantity: [],
    currentIndex: null,
    skuList: null,
  });
  const [showAlert, setShowAlert] = useState(false);
  const [added, setAdded] = useState(false);
  const [soldOut, setSoldOut] = useState(false);
  const [styleOut, setStyleOut] = useState(false);
  const ctx = useContext(ProductInfo);
  const { updateCart } = ctx;

  const handleAddToCart = () => {
    console.log(stock.skuList[stock.currentIndex]);
    const item = stock.skuList[stock.currentIndex];
    axios({
      method: 'post',
      url,
      headers: {
        Authorization: config.TOKEN,
      },
      data: {
        sku_id: item,
      },
    })
      .then(() => {
        axios.get(url, {
          headers: {
            Authorization: config.TOKEN,
          },
        })
          .then(({ data }) => {
            updateCart(data);
          });
      })
      .catch((err) => console.error(err));
  };

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
      currentIndex: e,
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
      currentSize: '',
      selectedQuantity: null,
      sizes: Object.values(skus).map((v) => v.size),
      quantity: Object.values(skus).map((v) => v.quantity),
      skuList: Object.keys(skus).map((v) => v),

    });
  }, [skus, added]);

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
              handleAddToCart();
              setAdded(true);
              setTimeout(() => {
                setAdded(false);
              }, 2000);
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
                  backgroundColor: showAlert ? 'rgba(255, 100, 100, 0)' : 'rgba(34,139,34, 0)',
                  padding: '2px 10px',
                  offset: '5px',
                  color: showAlert ? 'red' : 'black',
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
        </Col>
      </Row>
    </Container>
  );
};

export default Checkout;
