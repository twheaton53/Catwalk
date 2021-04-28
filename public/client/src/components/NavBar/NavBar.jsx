import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const NavBar = () => {
  const [logo, setLog] = useState();

  return (
    <Container id="nav-bar">
      <Row>
        <Col>
          <h1 id="shop-name">King&#39;s Clothing</h1>
        </Col>
        <Col id="search-bar">
          <p id="search-bar">Search Bar Placement</p>
        </Col>
      </Row>
    </Container>
  );
};

export default NavBar;
