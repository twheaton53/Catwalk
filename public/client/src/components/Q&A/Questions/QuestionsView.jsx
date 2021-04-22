/* eslint-disable react/prop-types */
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import AnswersBox from '../Answers/Answers';

const QuestionsView = ({ question }) => (
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
          <u>Yes</u>
          &nbsp;
          (
          {question.question_helpfulness}
          )
          &nbsp; | &nbsp;
          <u>Add Answer</u>
        </small>
      </Col>
    </Row>
    <Row className="mt-2">
      <AnswersBox questionId={question.question_id} />
    </Row>
  </>
);

export default QuestionsView;
