/* eslint-disable react/prop-types */
/* eslint-disable class-methods-use-this */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
import React, { useContext } from 'react';
// eslint-disable-next-line object-curly-newline
import { Container, Button, Col, Row, Form } from 'react-bootstrap';
import axios from 'axios';
import ReactModal from 'react-modal';
import SearchQuestions from './Search/SearchQuestions';
import QuestionsBox from './Questions/Questions';
import ProductInfo from '../../store/product';
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
      renderQuestions: true,
      showQuestions: 4,
      showModal: false,
      validated: false,
      search: '',
      storedQuestions: [],
      name: '',
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.filterQuestions = this.filterQuestions.bind(this);
  }

  componentDidMount() {

  }

  componentDidUpdate(prevProps) {
    const { prodName, prodId } = this.props;
    if (prodName !== prevProps.prodName) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        currentId: prodId,
        name: prodName,
      }, () => {
        const { currentId } = this.state;
        const configs = {
          headers: {
            Authorization: config.TOKEN,
          },
          params: {
            product_id: currentId,
          },
        };
        axios.get(`${url}/qa/questions`, configs)
          .then((result) => {
            if (result.data.results.length === 0) {
              this.setState({
                questions: result.data.results,
                renderQuestions: false,
                storedQuestions: result.data.results,
              });
            } else {
              this.setState({
                questions: result.data.results,
                renderQuestions: true,
                storedQuestions: result.data.results,
              });
            }
          })
          .catch((err) => {
            throw err;
          });
      });
    }
  }

  handleClick(e) {
    e.preventDefault();
    const { showQuestions } = this.state;
    this.setState({
      showQuestions: showQuestions + 2,
    });
  }

  handleSubmit(e) {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    this.setState({
      validated: true,
    }, () => {
      e.preventDefault();
      console.log('still entering other set');
      const { currentId } = this.state;
      const formData = new FormData(form);
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
            storedQuestions: result.data.results,
          });
        })
        .catch((err) => {
          throw err;
        });
    });
  }

  handleSearch(e) {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
    const { questions } = this.state;
    const { search } = this.state;
    const { storedQuestions } = this.state;

    if (search.length >= 2) {
      const filteredQuestions = this.filterQuestions(questions, search);
      this.setState({
        questions: filteredQuestions,
      });
    } else {
      this.setState({
        questions: storedQuestions,
      });
    }
  }

  handleOpenModal(e) {
    e.preventDefault();
    this.setState({ showModal: true });
  }

  handleCloseModal(e) {
    e.preventDefault();
    this.setState({ showModal: false });
  }

  filterQuestions(arr, query) {
    const filterArray = [];
    arr.map((question) => {
      if (question.question_body.toLowerCase().includes(query.toLowerCase())) {
        filterArray.push(question);
      }
    });
    return filterArray;
  }

  render() {
    const { questions } = this.state;
    const { renderQuestions } = this.state;
    const { showQuestions } = this.state;
    const { showModal } = this.state;
    const { validated } = this.state;
    const { search } = this.state;
    const { name } = this.state;
    const questionsArray = questions.slice(0, showQuestions);

    if (questions.length) {
      return (
        <Container id="widget">
          <Container>
            <p>QUESTIONS &amp; ANSWERS</p>
          </Container>
          <Container>
            <SearchQuestions searchFunc={this.handleSearch} search={search} />
          </Container>
          <Container className="QuestionsList">
            <QuestionsBox questions={questionsArray} display={renderQuestions} />
          </Container>
          <Container>
            <Row>
              <Button id="questions-button" onClick={this.handleClick}>MORE ANSWERED QUESTIONS</Button>
              <Col>
                <Button id="questions-button" onClick={this.handleOpenModal}>ADD A QUESTION</Button>
                <ReactModal
                  isOpen={showModal}
                  contentLabel="Add Question Modal"
                  style={{
                    overlay: {
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    },
                    content: {
                      backgroundColor: 'whitesmoke',
                      fontFamily: 'Merriweather, serif',
                    },
                  }}
                >
                  <Form noValidate validated={validated} onSubmit={this.handleSubmit}>
                    <Form.Group controlId="QuestionTextArea">
                      <Form.Label>Your Question</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        as="textarea"
                        rows={3}
                        name="question"
                        placeholder="1000 character limit"
                      />
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                      <Form.Control.Feedback type="invalid">Please ask a question</Form.Control.Feedback>
                      <h1 id="modal-title">Ask Your Question</h1>
                      <h4 id="modal-subtitle">
                        About the&nbsp;
                        {name}
                        .
                      </h4>
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
    return (
      <Container>
        <Container>
          QUESTIONS &amp; ANSWERS
        </Container>
        <Container>
          <SearchQuestions searchFunc={this.handleSearch} search={search} />
        </Container>
        <Container>
          <Row>
            <Col>
              No questions have been Submitted. If you have a question go ahead and ask!
            </Col>
          </Row>
          <Row>
            <Col>
              <Button onClick={this.handleOpenModal}>ADD A QUESTION</Button>
              <ReactModal
                isOpen={showModal}
                contentLabel="Add Question Modal"
                style={{
                  overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  },
                }}
              >
                <Form validated={validated} onSubmit={this.handleSubmit}>
                  <Form.Group controlId="QuestionTextArea">
                    <Form.Label>Your Question</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      as="textarea"
                      rows={3}
                      name="question"
                      placeholder="1000 character limit"
                    />
                    <h1>Ask Your Question</h1>
                    <h4>
                      About the&nbsp;
                      {name}
                      .
                    </h4>
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
