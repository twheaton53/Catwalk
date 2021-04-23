/* eslint-disable import/extensions */
/* eslint-disable react/prop-types */
import React, { useState, useRef } from 'react';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';
import PhotoDisplay from '../PhotoDisplay/PhotoDisplay';
import config from '../../../../../../config/config.js';

const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/qa/answers';
const auth = {
  headers: {
    Authorization: config.TOKEN,
  },
};

const AnswersView = ({ answer }) => {
  const [helpfulness, setHelpfulness] = useState(answer.helpfulness);
  const helpRef = useRef();
  const dateStr = answer.date;
  const dateObj = new Date(dateStr);
  const date = dateObj.toLocaleString('default', { month: 'long', day: 'numeric', year: 'numeric' });

  const handleClick = (e) => {
    e.preventDefault();
    const id = answer.answer_id;

    axios.put(`${url}/${id}/helpful`, null, auth)
      .then(() => {
        setHelpfulness(helpfulness + 1);
        if (helpRef.current) {
          helpRef.current.setAttribute('disabled', 'disabled');
        }
      })
      .catch((err) => {
        throw err;
      });
  };

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
              <button ref={helpRef} className="text-button" type="submit" onClick={handleClick}>Yes</button>
              &nbsp;
              (
              {helpfulness}
              )
              &nbsp; |  &nbsp;
              <button className="text-button" type="submit">Report</button>
            </small>
          </p>
        </Col>
      </Row>
    </>
  );
};

export default AnswersView;
