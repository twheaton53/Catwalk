/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable import/extensions */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import axios from 'axios';
import AnswersBox from '../Answers/Answers';
import config from '../../../../../../config/config.js';

const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/qa/questions';
const auth = {
  headers: {
    Authorization: config.TOKEN,
  },
};

const aStyle = {
  textDecorations: 'none',
  color: 'inherit',
};

const QuestionsView = ({ question }) => {
  const [helpfulness, setHelpfulness] = useState(question.question_helpfulness);
  const handleClick = (e) => {
    e.preventDefault();
    const id = question.question_id;

    axios.put(`${url}/${id}/helpful`, null, auth)
      .then((res) => {
        setHelpfulness(helpfulness + 1);
      })
      .catch((err) => {
        throw err;
      });
  };

  return (
    <>
      <Row>
        <strong>Q:</strong>
        <Col>
          <strong>
            {question.question_body}
          </strong>
        </Col>
        <Col>
          <small>
            Helpful?
            &nbsp;
            <a style={aStyle} target="_blank" rel="noreferrer" href="#" onClick={handleClick}><u>Yes</u></a>
            &nbsp;
            (
            {helpfulness}
            )
            &nbsp; | &nbsp;
            <a style={aStyle} target="_blank" rel="noreferrer" href="null"><u>Add Answer</u></a>
          </small>
        </Col>
      </Row>
      <Row className="mt-2">
        <AnswersBox questionId={question.question_id} />
      </Row>
    </>
  );
};

export default QuestionsView;
