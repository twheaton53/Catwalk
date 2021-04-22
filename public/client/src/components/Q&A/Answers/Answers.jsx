/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-console */
/* eslint-disable import/extensions */
/* eslint-disable react/prop-types */
import React from 'react';
import axios from 'axios';
import { Col } from 'react-bootstrap';
import AnswersView from './AnswersView';
import API_KEY from '../../../../../../config/config.js';

const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/qa/questions';
const auth = {
  headers: {
    Authorization: API_KEY,
  },
};

class AnswersBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questionId: props.questionId,
      answers: [],
    };
  }

  componentDidMount() {
    const { questionId } = this.state;
    axios.get(`${url}/${questionId}/answers`, auth)
      .then((answers) => {
        this.setState({
          answers: answers.data.results,
        });
      })
      .catch((err) => {
        throw err;
      });
  }

  render() {
    const { answers } = this.state;
    return (
      <>
        <strong>A:</strong>
        <Col>
          {answers.map((answer, index) => (
            <AnswersView answer={answer} key={index} />
          ))}
          <strong>
            <small>
              <a href={null} style={{ cursor: 'pointer' }}>LOAD MORE ANSWERS</a>
            </small>
          </strong>
        </Col>
      </>
    );
  }
}

export default AnswersBox;
