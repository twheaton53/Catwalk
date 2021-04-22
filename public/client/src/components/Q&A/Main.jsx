import React from 'react';
// eslint-disable-next-line object-curly-newline
import { Container, Row, Col } from 'react-bootstrap';
import SearchQuestions from './Search/SearchQuestions';
import QuestionsBox from './Questions/Questions';
import AnswersBox from './Answers/Answers';

const Questions = () => (
  <Container fluid>
    <Row>
      <Col>QUESTIONS & ANSWERS</Col>
    </Row>
    <SearchQuestions />
    <QuestionsBox />
    {/* Another child component */}
    <AnswersBox />
  </Container>
);

export default Questions;
