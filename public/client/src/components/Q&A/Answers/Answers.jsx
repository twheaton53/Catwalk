import React from 'react';
import { Row, Col } from 'react-bootstrap';

class AnswersBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      answerText: ' No, it is a jacket, why would it come with pants?',
    };
  }

  render() {
    const { answerText } = this.state;

    return (
      <>
        <Row>
          <Col>
            <strong>A:</strong>
            {answerText}
          </Col>
        </Row>
        <Row>
          <Col>
            <small>
              by User1337, Apr 20, 2021
              | Helpful? Yes(0)
              | Report
            </small>
          </Col>
        </Row>
      </>
    );
  }
}

export default AnswersBox;
