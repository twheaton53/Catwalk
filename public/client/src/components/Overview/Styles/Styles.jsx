import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';

const Styles = ( {product, newStyle} ) => {
  const { styles, currentStyle } = product;
  const { name, photos } = currentStyle;
  const [images, setImages] = useState([]);
  console.log(newStyle);

  const sortImages = () => {
    const sortedImages = styles.map(style => {
      return style.photos[0].thumbnail_url;
    })
    setImages(sortedImages);
  }
  useEffect(() => {
    sortImages();
  }, [])

  return (
    <Container className="styles-section">
      <Row>
        <p><strong>Style > </strong>{name}</p>
      </Row>
      <Row className="style-images">
        {images.length && images.map((image, index) => (
          <Col xs={3} key={index} className="style-images-col">
            <Image src={image} onClick={() => newStyle(index)} className="style-img" roundedCircle fluid/>
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default Styles;