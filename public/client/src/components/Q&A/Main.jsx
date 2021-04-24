/* eslint-disable import/extensions */
import React from 'react';
// eslint-disable-next-line object-curly-newline
import { Container, Button, Col, Row, Form } from 'react-bootstrap';
import axios from 'axios';
import ReactModal from 'react-modal';
import SearchQuestions from './Search/SearchQuestions';
import QuestionsBox from './Questions/Questions';
import config from '../../../../../config/config.js';

ReactModal.setAppElement('#app');

const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax';
const auth = {
  headers: {
    Authorization: config.TOKEN,
  },
};

class Questions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentId: null,
      questions: [],
      showQuestions: 4,
      showModal: false,
      validated: false,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  componentDidMount() {
    axios.get(`${url}/products`, auth)
      .then((result) => {
        this.setState({
          currentId: result.data[0].id,
        });
        const { currentId } = this.state;
        const configs = {
          headers: {
            Authorization: config.TOKEN,
          },
          params: {
            product_id: currentId,
          },
        };
        return axios.get(`${url}/qa/questions`, configs);
      })
      .then((result) => {
        this.setState({
          questions: result.data.results,
        });
      })
      .catch((err) => {
        throw err;
      });
  }

  handleClick(e) {
    e.preventDefault();
    this.setState({
      showQuestions: Infinity,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { currentId } = this.state;
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    const formData = new FormData(e.currentTarget);
    const formDataObj = Object.fromEntries(formData.entries());

    axios({
      method: 'post',
      url: `${url}/qa/questions`,
      data: {
        body: formDataObj.question,
        name: formDataObj.nickname,
        email: formDataObj.email,
        product_id: currentId,
      },
      headers: {
        Authorization: config.TOKEN,
      },
    })
      .then(() => {
        const configs = {
          headers: {
            Authorization: config.TOKEN,
          },
          params: {
            product_id: currentId,
          },
        };
        return axios.get(`${url}/qa/questions`, configs);
      })
      .then((result) => {
        this.setState({
          questions: result.data.results,
          validated: true,
          showModal: false,
        });
      })
      .catch((err) => {
        throw err;
      });
  }

  handleOpenModal(e) {
    e.preventDefault();
    this.setState({ showModal: true });
  }

  handleCloseModal(e) {
    e.preventDefault();
    this.setState({ showModal: false });
  }

  render() {
    const { questions } = this.state;
    const { showQuestions } = this.state;
    const { showModal } = this.state;
    const { validated } = this.state;
    const questionsArray = questions.slice(0, showQuestions);

    return (
      <Container>
        <Container>
          QUESTIONS &amp; ANSWERS
        </Container>
        <Container>
          <SearchQuestions />
        </Container>
        <Container>
          <QuestionsBox questions={questionsArray} />
        </Container>
        <Container>
          <Row>
            <Button variant="outline-dark" onClick={this.handleClick}>MORE ANSWERED QUESTIONS</Button>
            <Col>
              <Button variant="outline-dark" onClick={this.handleOpenModal}>ADD A QUESTION</Button>
              <ReactModal
                isOpen={showModal}
                contentLabel="Add Question Modal"
              >
                <Form noValidate validated={validated} onSubmit={this.handleSubmit}>
                  <Form.Group controlId="QuestionTextArea">
                    <Form.Label>Your Question</Form.Label>
                    <Form.Control
                      required
                      as="textarea"
                      rows={3}
                      name="question"
                      placeholder="1000 character limit"
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">Please ask a question</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId="nicknameInput">
                    <Form.Label>What Is Your Nickname?</Form.Label>
                    <Form.Control
                      required
                      type="username"
                      name="nickname"
                      placeholder="Example: jackson11!"
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">Please enter a valid username</Form.Control.Feedback>
                    <Form.Text className="text-muted">
                      For privacy reasons, do not use your full name or email address
                    </Form.Text>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>What Is Your Email?</Form.Label>
                    <Form.Control
                      required
                      type="email"
                      name="email"
                      placeholder="Why did you like the product or not?"
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">Please enter a valid email.</Form.Control.Feedback>
                    <Form.Text className="text-muted">
                      For authentication reasons, you will not be emailed
                    </Form.Text>
                  </Form.Group>
                  <Button variant="outline-dark" type="submit">Submit Question</Button>
                  <Button variant="outline-dark" onClick={this.handleCloseModal}>Close</Button>
                </Form>
              </ReactModal>
            </Col>
          </Row>
        </Container>
      </Container>
    );
  }
}

export default Questions;
