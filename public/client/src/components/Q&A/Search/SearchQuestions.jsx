/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Form, Col } from 'react-bootstrap';

const SearchQuestions = ({ searchFunc, search }) => (
  <Form>
    <Form.Row>
      <Col md>
        <Form.Group controlId="formSearchQuestions">
          <Form.Control type="text" name="search" placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS." value={search} onChange={searchFunc} />
        </Form.Group>
      </Col>
    </Form.Row>
  </Form>
);

export default SearchQuestions;
