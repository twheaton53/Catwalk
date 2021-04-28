import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const NavBar = () => {
  const [logo, setLog] = useState();

  return (
    <Container id="nav-bar">
      <Row>
        <Col>
          <p>Logo</p>
        </Col>
        <Col id="search-bar">
          <p id="search-bar">Search Bar Placement</p>
        </Col>
      </Row>
    </Container>
  );
};

export default NavBar;
