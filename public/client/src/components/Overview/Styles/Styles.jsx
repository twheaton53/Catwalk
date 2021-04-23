import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Styles = ( {currentStyle} ) => {
  const { name } = currentStyle;
  console.log(currentStyle);
  return (
    <Container>
      <Row className="styles-section">
        <p><strong>Style > </strong>{name}</p>
      </Row>
      <Row>

      </Row>


    </Container>
  )
}

export default Styles;