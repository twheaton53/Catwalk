/* eslint-disable react/prop-types */
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import AnswersBox from '../Answers/Answers';

const aStyle = {
  'text-decorations': 'none',
  color: 'inherit',
};

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
          <a style={aStyle} target="_blank" rel="noreferrer" href="null"><u>Yes</u></a>
          &nbsp;
          (
          {question.question_helpfulness}
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

export default QuestionsView;
