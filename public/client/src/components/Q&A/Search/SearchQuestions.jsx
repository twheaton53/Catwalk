import React from 'react';
import { Form, Col } from 'react-bootstrap';

const SearchQuestions = () => (
  <Form>
    <Form.Row>
      <Col md>
        <Form.Group controlId="formSearchQuestions">
          <Form.Control type="text" placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS." />
        </Form.Group>
      </Col>
    </Form.Row>
  </Form>
);

export default SearchQuestions;
