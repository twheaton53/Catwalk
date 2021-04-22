/* eslint-disable import/extensions */
/* eslint-disable no-console */
import React from 'react';
import axios from 'axios';
import { Col, Row } from 'react-bootstrap';
import API_KEY from '../../../../../../config/config.js';

const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/';
const auth = {
  headers: {
    Authorization: API_KEY,
  },
};

class QuestionsBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentId: '',
      questions: [],
    };
  }

  componentDidMount() {
    axios.get(`${url}/products`, auth)
      .then((result) => {
        console.log(result.data[0]);
        this.setState({
          currentId: result.data[0].id,
        });
        const { currentId } = this.state;
        return axios.get(`${url}/qa/questions`, { params: { product_id: currentId } });
      })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { questionText } = this.state;
    return (
      <Row>
        <Col>
          <strong>
            Q:
            {questionText}
          </strong>
        </Col>
        <Col>
          <small>Helpful? Yes (25) | Add Answer</small>
        </Col>
      </Row>
    );
  }
}

export default QuestionsBox;
