/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Collapse from 'react-bootstrap/Collapse';
import Button from 'react-bootstrap/Button';
import Comment from './Comment';
import ProductInfo from '../../../store/product';

const CommentList = ({ reviews, starFilter }) => {
  const ctx = useContext(ProductInfo);
  const { results } = reviews;
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState(starFilter);
  let filteredList = [];
  if (filter.length > 0) {
    filteredList = results.filter((review) => (
      filter.includes(review.rating)
    ));
    console.log('Filtered List', filteredList);
  } else {
    filteredList = results;
  }

  const displayButton = () => (
    <span>
      <Button
        className="load-more"
        variant="outline-dark"
        size="lg"
        type="submit"
        onClick={() => setOpen(!open)}
        aria-controls="collapse-text"
        aria-expanded={open}
      >
        MORE REVIEWS
      </Button>
      &nbsp;&nbsp;&nbsp;
    </span>
  );

  const CollapseText = () => (
    <Collapse in={open}>
      <div id="collapse-text">
        {
          results.slice(2).map((review) => (
            <Row>
              <Comment review={review} key={Number(review.review_id)} />
            </Row>
          ))
        }
      </div>
    </Collapse>
  );

  // To do list scrollable container for comment section
  if (results) {
    return (
      <div>
        <Container fluid>
          {
            filteredList.length ? (
              filteredList.slice(0, 2).map((review) => (
                <Row>
                  <Comment review={review} key={Number(review.review_id)} />
                </Row>
              ))
            ) : <p />
          }
          { filteredList.slice(2) !== [] ? CollapseText() : <p />}
          <Row>
            <span>
              {filteredList.length > 2 ? displayButton() : <p />}
              <Button className="review-submit" variant="outline-dark" size="lg" type="submit" onClick={() => alert('Clicked!')}>ADD A REVIEW +</Button>
            </span>
          </Row>
        </Container>
      </div>
    );
  }

  return <div />;
};

export default CommentList;
