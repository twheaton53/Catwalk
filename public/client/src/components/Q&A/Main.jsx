/* eslint-disable import/extensions */
import React from 'react';
// eslint-disable-next-line object-curly-newline
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import SearchQuestions from './Search/SearchQuestions';
import QuestionsBox from './Questions/Questions';
import API_KEY from '../../../../../config/config.js';

const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax';
const auth = {
  headers: {
    Authorization: API_KEY,
  },
};

class Questions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentId: null,
      questions: [],
      answers: [],
    };
  }

  componentDidMount() {
    axios.get(`${url}/products`, auth)
      .then((result) => {
        console.log(result.data[0]);
        this.setState({
          currentId: result.data[0].id,
        });
        const { currentId } = this.state;
        const config = {
          headers: {
            Authorization: API_KEY,
          },
          params: {
            product_id: currentId,
          },
        };
        return axios.get(`${url}/qa/questions`, config);
      })
      .then((result) => {
        this.setState({
          questions: result.data.results,
        }, () => console.log(this.state.questions));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { questions } = this.state;
    return (
      <Container fluid>
        <Row>
          <Col>QUESTIONS &amp; ANSWERS</Col>
        </Row>
        <SearchQuestions />
        <QuestionsBox questions={questions} />
      </Container>
    );
  }
}

export default Questions;
