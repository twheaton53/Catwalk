/* eslint-disable import/extensions */
import React from 'react';
// eslint-disable-next-line object-curly-newline
import { Container, Button, Col, Row } from 'react-bootstrap';
import axios from 'axios';
import SearchQuestions from './Search/SearchQuestions';
import QuestionsBox from './Questions/Questions';
import config from '../../../../../config/config.js';

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
      showQuestions: 2,
    };

    this.handleClick = this.handleClick.bind(this);
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

  render() {
    const { questions } = this.state;
    const { showQuestions } = this.state;
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
              <Button variant="outline-dark">ADD A QUESTION</Button>
            </Col>
          </Row>
        </Container>
      </Container>
    );
  }
}

export default Questions;
