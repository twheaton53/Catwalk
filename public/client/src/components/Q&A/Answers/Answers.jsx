/* eslint-disable react/no-did-update-set-state */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-console */
/* eslint-disable import/extensions */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Col } from 'react-bootstrap';
import AnswersView from './AnswersView';
import config from '../../../../../../config/config.js';

const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/qa/questions';
const auth = {
  headers: {
    Authorization: config.TOKEN,
  },
};

const AnswersBox = ({ questionsId }) => {
  const [questionId, setQuestionId] = useState();
  const [answers, setAnswers] = useState([]);
  const [showAnswers, setShowAnswers] = useState(2);
  console.log('this is questionId after state ', questionsId);

  useEffect(() => {
    if (!questionsId) return;
    (async () => {
      console.log('using effect');
      const answerResults = await axios.get(`${url}/${questionsId}/answers`, auth);
      setAnswers(answerResults.data.results);
    })();
  }, [questionsId]);

  const handleClick = (e) => {
    e.preventDefault();
    setShowAnswers(Infinity);
  };

  const handleReset = (e) => {
    e.preventDefault();
    setShowAnswers(2);
  };
  console.log('this is answers ', answers);
  const answersArray = answers.slice(0, showAnswers);

  if (answers.length) {
    if (answers.length <= 2) {
      return (
        <>
          <strong>A:</strong>
          <Col>
            {answersArray.map((answer, index) => (
              <AnswersView answer={answer} key={index} />
            ))}
          </Col>
        </>
      );
    }

    if (answersArray.length === answers.length) {
      return (
        <>
          <strong>A:</strong>
          <Col>
            {answersArray.map((answer, index) => (
              <AnswersView answer={answer} key={index} />
            ))}
            <strong>
              <small>
                <a href={null} style={{ cursor: 'pointer' }} onClick={handleReset}>COLLAPSE ANSWERS</a>
              </small>
            </strong>
          </Col>
        </>
      );
    }
    return (
      <>
        <strong>A:</strong>
        <Col>
          {answersArray.map((answer, index) => (
            <AnswersView answer={answer} key={index} />
          ))}
          <strong>
            <small>
              <a href={null} style={{ cursor: 'pointer' }} onClick={handleClick}>LOAD MORE ANSWERS</a>
            </small>
          </strong>
        </Col>
      </>
    );
  }
  return (
    <div />
  );
};

export default AnswersBox;
