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
      showAnswers: 2,
    };

    this.handleClick = this.handleClick.bind(this);
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

  handleClick(e) {
    e.preventDefault();
    this.setState({
      showAnswers: Infinity,
    });
  }

  render() {
    const { answers } = this.state;
    const { showAnswers } = this.state;
    const answersArray = answers.slice(0, showAnswers);

    return (
      <>
        <strong>A:</strong>
        <Col>
          {answersArray.map((answer, index) => (
            <AnswersView answer={answer} key={index} />
          ))}
          <strong>
            <small>
              <a href={null} style={{ cursor: 'pointer' }} onClick={this.handleClick}>LOAD MORE ANSWERS</a>
            </small>
          </strong>
        </Col>
      </>
    );
  }
}

export default AnswersBox;
