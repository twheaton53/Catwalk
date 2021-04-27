/* eslint-disable react/prop-types */
import React, { useState, useRef, useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Rating from '@material-ui/lab/Rating';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import axios from 'axios';
import PhotoDisplay from '../../Q&A/PhotoDisplay/PhotoDisplay';
import config from '../../../../../../config/config';

const options = {
  url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax',
  headers: {
    Authorization: `${config.TOKEN}`,
  },
};

const Comment = ({ review }) => {
  const [helpfulness, setHelpfulness] = useState(review.helpfulness);
  const helpRef = useRef();
  const invalidTypes = ['', null, undefined, NaN];

  const handleHelpful = (e) => {
    e.preventDefault();
    const ID = review.review_id;
    axios({
      method: 'put',
      url: `${options.url}/reviews/${ID}/helpful`,
      headers: options.headers,
    })
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

  const Styles = `
  .response {background-color: #D3D3D3}
  .review {border-bottom: 2px solid black}
  .underline {
    border: none;
    padding: 0;
    background: none;
    text-decoration: underline;
    color: inherit;
  }
  `;

  if (review) {
    return (
      <Container fluid className="review">
        <style type="text/css">
          {Styles}
        </style>
        <Row>
          <Col xs="10">
            <Rating
              // style={{color: 'grey'}}
              defaultValue={review.rating}
              precision={0.25}
              size="small"
              readOnly
            />
          </Col>
          <Col lg="auto">
            <p>
              {invalidTypes.indexOf(review.reviewer_name) === -1 ? review.reviewer_name : 'anonymous'}
              ,&nbsp;
              {
                new Date(review.date)
                  .toLocaleString('default',
                    { month: 'long', day: 'numeric', year: 'numeric' })
              }
            </p>
          </Col>
        </Row>
        <h3>{review.summary.slice(0, 61)}</h3>
        <p>{review.body}</p>
        {review.recommend === true ? (
          <p>
            <CheckCircleIcon fontSize="small" />
            &nbsp; I recommend this product
          </p>
        ) : <p />}
        {
          invalidTypes.indexOf(review.response) === -1 ? (
            <Container className="response">
              <p><strong>Response from seller:</strong></p>
              <p>{review.response}</p>
            </Container>
          ) : <p />
        }
        <PhotoDisplay pictures={review.photos.slice(0, 5)} />
        <Row>
          <span>Was this review helpful?&nbsp;</span>
          <button className="underline" ref={helpRef} type="submit" onClick={handleHelpful}>Yes</button>
          <span>
            &nbsp;
            {helpfulness}
          </span>
          {/* <span>&nbsp;|&nbsp;</span>
          <span className="underline">No</span> */}
          <span>&nbsp;|&nbsp;</span>
          <span className="underline">Report</span>
        </Row>
      </Container>
    );
  }

  return <div />;
};

export default Comment;
