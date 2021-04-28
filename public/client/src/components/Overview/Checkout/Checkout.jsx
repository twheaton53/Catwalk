import React, { useState } from 'react';
import {
  DropdownButton, Container, Row, Col, Dropdown,
} from 'react-bootstrap';

const Checkout = () => {
  const [menu, setMenu] = useState();
  return (
    <Container>
      <Row className="checkout-row1">
        <Col>
          <DropdownButton id="dropdown-basic-button" title="SELECT SIZE">
            <Dropdown.Item href="#/action-1">So Fetch</Dropdown.Item>
          </DropdownButton>
        </Col>
        <Col>
          <DropdownButton id="dropdown-basic-button" title="QUANTITY">
            <Dropdown.Item href="#/action-1">So Fetch</Dropdown.Item>
          </DropdownButton>
        </Col>
      </Row>
      <Row>
        <Col>
          <DropdownButton id="dropdown-variants-button" title="ADD TO BAG">
            <Dropdown.Item href="#/action-1">So Fetch</Dropdown.Item>
          </DropdownButton>
        </Col>
      </Row>
    </Container>
  );
};

export default Checkout;
