/* eslint-disable react/no-array-index-key */
/* eslint-disable import/extensions */
/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-bootstrap';
import QuestionsView from './QuestionsView';

const QuestionsBox = ({ questions }) => (
  <Row>
    <Col>
      <div>
        {questions.map((question, index) => (
          <QuestionsView question={question} key={index} />
        ))}
      </div>
    </Col>
  </Row>
);

QuestionsBox.propTypes = {
  questions: PropTypes.instanceOf(Array).isRequired,
};
export default QuestionsBox;
