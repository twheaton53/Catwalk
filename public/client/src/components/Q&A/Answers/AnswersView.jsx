/* eslint-disable react/prop-types */
import React from 'react';
import { Row, Col } from 'react-bootstrap';

const AnswersView = ({ answer }) => {
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dateStr = answer.date;
  const dateObj = new Date(dateStr);
  const monthNum = dateObj.getUTCMonth();
  const month = monthNames[monthNum];
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();
  const date = `${month} ${day}, ${year}`;

  return (
    <>
      {console.log(answer)}
      <p>{answer.body}</p>
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
              <u>Yes</u>
              &nbsp;
              (
              {answer.helpfulness}
              )
              &nbsp; |  &nbsp; Report
            </small>
          </p>
        </Col>
      </Row>
    </>
  );
};

export default AnswersView;
