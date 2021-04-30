/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable import/extensions */
/* eslint-disable react/prop-types */
import React, { useState, useRef, useContext } from 'react';
import {
  Col, Row, Form, Button,
} from 'react-bootstrap';
import axios from 'axios';
import ReactModal from 'react-modal';
import AnswersBox from '../Answers/Answers';
import ProductInfo from '../../../store/product';
import config from '../../../../../../config/config.js';

const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/qa/questions';
const auth = {
  headers: {
    Authorization: config.TOKEN,
  },
};

const QuestionsView = ({ question }) => {
  const ctx = useContext(ProductInfo);
  const { name } = ctx;
  const [showModal, setShowModal] = useState(false);
  const [validated, setValidated] = useState(false);
  const [helpfulness, setHelpfulness] = useState(question.question_helpfulness);
  const helpRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);
    const formData = new FormData(e.currentTarget);
    const formDataObj = Object.fromEntries(formData.entries());
    const id = question.question_id;
    axios({
      method: 'post',
      url: `${url}/${id}/answers`,
      data: {
        body: formDataObj.answer,
        name: formDataObj.nickname,
        email: formDataObj.email,
        photos: [''],
      },
      headers: {
        Authorization: config.TOKEN,
      },
    })
      .then(() => {
        setShowModal(false);
      })
      .catch((err) => {
        throw err;
      });
  };

  const handleOpenModal = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleCloseModal = (e) => {
    e.preventDefault();
    setShowModal(false);
  };

  const handleClick = (e) => {
    e.preventDefault();
    const id = question.question_id;

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
      <Row>
        <strong id="bold-black">Q:</strong>
        <Col id="bold-black">
          <strong>
            {question.question_body}
          </strong>
        </Col>
        <Col>
          <small>
            Helpful?
            &nbsp;
            <button ref={helpRef} className="text-button" type="submit" onClick={handleClick}>Yes</button>
            &nbsp;
            (
            {helpfulness}
            )
            &nbsp; | &nbsp;
            <button className="text-button" type="submit" onClick={handleOpenModal}>Add Answer</button>
            <ReactModal
              isOpen={showModal}
              contentLabel="Add Answer Modal"
              style={{
                overlay: {
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                },
              }}
            >
              <h1>Submit Your Answer</h1>
              <h4>
                {name}
                &nbsp; : &nbsp;
                {question.question_body}
              </h4>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group controlId="AnswerTextArea">
                  <Form.Label>Your Answer</Form.Label>
                  <Form.Control
                    required
                    as="textarea"
                    rows={3}
                    name="answer"
                    placeholder="1000 character limit"
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">Please answer the question</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="nickname">
                  <Form.Label>What Is Your Nickname?</Form.Label>
                  <Form.Control
                    required
                    type="username"
                    name="nickname"
                    placeholder="Example: jack543!"
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">Please enter a nickname</Form.Control.Feedback>
                  <Form.Text className="text-muted">
                    For privacy reasons, do not use your full name or email address.
                  </Form.Text>
                </Form.Group>
                <Form.Group controlId="email">
                  <Form.Label>What Is Your Email?</Form.Label>
                  <Form.Control
                    required
                    type="email"
                    name="email"
                    placeholder="Example: jack@email.com"
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">Please enter a valid email</Form.Control.Feedback>
                  <Form.Text className="text-muted">
                    For authentication reasons, you will not be emailed.
                  </Form.Text>
                </Form.Group>
                {/* <Form.Group>
                  <Form.File
                    id="custom-file"
                    label="Custom file input"
                    name="photos"
                    custom
                  />
                </Form.Group> */}
                <Button variant="outline-dark" type="submit">Submit Answer</Button>
                <Button variant="outline-dark" onClick={handleCloseModal}>Close</Button>
              </Form>
            </ReactModal>
          </small>
        </Col>
      </Row>
      <Row className="mt-2">
        <AnswersBox questionsId={question.question_id} />
      </Row>
    </>
  );
};

export default QuestionsView;
