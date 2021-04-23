/* eslint-disable react/prop-types */
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import PhotoDisplay from '../PhotoDisplay/PhotoDisplay';

const aStyle = {
  textDecorations: 'none',
  color: 'inherit',
};

const AnswersView = ({ answer }) => {
  const dateStr = answer.date;
  const dateObj = new Date(dateStr);
  const date = dateObj.toLocaleString('default', { month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <>
      <p>{answer.body}</p>
      <Row>
        <Col>
          <PhotoDisplay pictures={answer.photos} />
        </Col>
      </Row>
      <Row>
        <Col>
          <p>
            <small>
              by
              {answer.answerer_name}
              ,
              &nbsp;
              {date}
              &nbsp; |&nbsp; Helpful? &nbsp;
              <a style={aStyle} target="_blank" rel="noreferrer" href="null"><u>Yes</u></a>
              &nbsp;
              (
              {answer.helpfulness}
              )
              &nbsp; |  &nbsp;
              <a style={aStyle} target="_blank" rel="noreferrer" href="null"><u>Report</u></a>
            </small>
          </p>
        </Col>
      </Row>
    </>
  );
};

export default AnswersView;
