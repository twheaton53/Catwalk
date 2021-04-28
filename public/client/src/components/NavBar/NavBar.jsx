import React from 'react';
import {
  Container, Row, Col, Form,
} from 'react-bootstrap';

const NavBar = (props) => {
  const { searchFunc, search } = props;

  return (
    <Container id="nav-bar">
      <Row>
        <Col>
          <h1 id="shop-name">King&#39;s Clothing</h1>
        </Col>
        <Col>
          <Form id="search-bar">
            <Form.Control style={{ backgroundColor: '#33202A', color: 'whitesmoke' }} value={search} onChange={searchFunc} type="text" placeholder="Search" />
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default NavBar;
