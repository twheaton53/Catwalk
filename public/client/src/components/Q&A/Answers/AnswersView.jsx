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
  const [reported, setReported] = useState(false);
  const helpRef = useRef();
  const repRef = useRef();
  const dateStr = answer.date;
  const dateObj = new Date(dateStr);
  const date = dateObj.toLocaleString('default', { month: 'long', day: 'numeric', year: 'numeric' });

  const handleClick = (e) => {
    e.preventDefault();
    const id = answer.answer_id;
    if (e.target.name === 'helpful') {
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
    }

    if (e.target.name === 'report') {
      axios.put(`${url}/${id}/report`, null, auth)
        .then(() => {
          if (repRef.current) {
            repRef.current.setAttribute('disabled', 'disabled');
            setReported(true);
          }
        })
        .catch((err) => {
          throw err;
        });
    }
  };

  return (
    <>
      <p id="answer">{answer.body}</p>
      {console.log('this is answer id', answer.answer_id)}
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
              &nbsp;
              {answer.answerer_name}
              ,
              &nbsp;
              {date}
              &nbsp; |&nbsp; Helpful? &nbsp;
              <button ref={helpRef} name="helpful" className="text-button" type="submit" onClick={handleClick}>Yes</button>
              &nbsp;
              (
              {helpfulness}
              )
              &nbsp; |  &nbsp;
              {reported
                ? <button ref={repRef} name="report" className="text-button" type="submit" onClick={handleClick}>Reported</button>
                : <button ref={repRef} name="report" className="text-button" type="submit" onClick={handleClick}>Report</button>}
            </small>
          </p>
        </Col>
      </Row>
    </>
  );
};

export default AnswersView;
