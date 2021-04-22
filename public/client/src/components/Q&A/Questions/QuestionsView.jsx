/* eslint-disable react/prop-types */
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import AnswersBox from '../Answers/Answers';

const QuestionsView = ({ question }) => (
  <>
    <Row>
      <Col>
        <strong>
          Q:
          {question.question_body}
        </strong>
      </Col>
      <Col>
        <small>
          Helpful? Yes (
          {question.question_helpfulness}
          ) | Add Answer
        </small>
      </Col>
    </Row>
    <Row>
      <AnswersBox questionId={question.question_id} />
    </Row>
  </>
);

export default QuestionsView;
