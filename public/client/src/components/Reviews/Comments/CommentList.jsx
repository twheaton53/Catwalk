/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import Collapse from 'react-bootstrap/Collapse';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ReactModal from 'react-modal';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import axios from 'axios';
import config from '../../../../../../config/config';
import Comment from './Comment';
import ProductInfo from '../../../store/product';

const options = {
  url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax',
  headers: {
    Authorization: `${config.TOKEN}`,
  },
};

const labels = {
  1: 'Poor',
  2: 'Fair',
  3: 'Average',
  4: 'Good!',
  5: 'Great!',
};

const valueMapper = {
  Size: ['A size too small', '½ a size too small', 'Perfect', '½ a size too big', 'A size too wide'],
  Width: ['Too narrow', 'Slightly narrow', 'Perfect', 'Slightly wide', 'Too wide'],
  Comfort: ['Uncomfortable', 'Slightly uncomfortable', 'Ok', 'Comfortable', 'Perfect'],
  Quality: ['Poor', 'Below average', 'What I expected', 'Pretty great', 'Perfect'],
  Length: ['Runs short', 'Runs slightly short', 'Perfect', 'Runs slightly long', 'Runs long'],
  Fit: ['Runs tight', 'Runs slightly tight', 'Pefect', 'Runs slightly big', 'Runs big'],
};

const useStyles = makeStyles({
  root: {
    width: 200,
    display: 'flex',
    alignItems: 'center',
  },
});

const CommentList = ({ reviews, starFilter }) => {
  const ctx = useContext(ProductInfo);
  const { id, name } = ctx;
  const { results } = reviews;
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState(starFilter);
  const [star, setValue] = React.useState(0);
  const [hover, setHover] = React.useState(-1);
  const [showModal, setModal] = useState(false);
  const [validated, setValidate] = useState(false);
  const [traitObj, setTrait] = useState({});
  const [products, setProducts] = useState({
    currentProductID: null,
    traitsList: [],
  });

  useEffect(() => {
    if (!id) return;
    (async () => {
      const reviewsList = await axios({
        method: 'get',
        url: `${options.url}/reviews/meta`,
        params: {
          product_id: id,
        },
        headers: options.headers,
      });
      setProducts({
        currentProductID: reviewsList.data.product_id,
        traitsList: reviewsList.data.characteristics,
      });
    })();
  }, [id]);

  const traitArr = (Object.entries(products.traitsList));
  let filteredList = [];

  useEffect(() => {
    setFilter(starFilter);
  }, [starFilter]);

  if (filter.length > 0) {
    filteredList = results.filter((review) => (
      filter.includes(review.rating)
    ));
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
          filteredList.slice(2).map((review) => (
            <Row>
              <Comment review={review} key={Number(Math.random() * 9999)} />
            </Row>
          ))
        }
      </div>
    </Collapse>
  );

  const handleOpenModal = (e) => {
    e.preventDefault();
    setModal(true);
  };

  const handleCloseModal = (e) => {
    e.preventDefault();
    setModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidate(true);
    const data = new FormData(e.currentTarget);
    const formDataObj = Object.fromEntries(data.entries());
    alert('Submitted!');
    // console.log('Keys', Object.keys(formDataObj));
    // console.log('Values', Object.values(formDataObj));
    // console.log('ID', id);
    // const dummy = {
    //   product_id: id,
    //   rating: Number(formDataObj['hover-feedback']),
    //   summary: formDataObj.summary,
    //   body: formDataObj.body,
    //   recommend: Object.keys(formDataObj).includes('recommend'),
    //   name: formDataObj.nickname,
    //   email: formDataObj.email,
    //   photos: [],
    //   characteristics: traitObj,
    // };
    // console.log('Data object', dummy);
    axios({
      method: 'post',
      url: `${options.url}/reviews`,
      data: {
        product_id: id,
        rating: Number(formDataObj['hover-feedback']),
        summary: formDataObj.summary,
        body: formDataObj.body,
        recommend: Object.keys(formDataObj).includes('recommend'),
        name: formDataObj.nickname,
        email: formDataObj.email,
        photos: [],
        characteristics: traitObj,
      },
      headers: options.headers,
    })
      .then((res) => {
        setModal(false);
        console.log('Success!', res.data);
      })
      .catch((err) => {
        throw err;
      });
  };

  const Styles = `
  .reviewList {
    overflow-y: scroll;
    width: auto;
    position:relative;
    height: 400px;
  }
  `;

  const handleTrait = (e) => {
    const trait = e.target.name;
    const rating = Number(e.target.value);
    const charID = (products.traitsList[trait].id).toString();
    e.preventDefault();
    setTrait({
      ...traitObj,
      [charID]: rating,
    });
  };

  const Buttongroup = (trait, mapper) => {
    let counter = 1;
    return (
      <div>
        <Form.Label>
          <strong>
            {trait}
            :
          </strong>
          &nbsp;&nbsp;
        </Form.Label>
        <ButtonGroup aria-label={trait}>
          {mapper[trait].map((option) => (
            <Button
              variant="outline-success"
              size="sm"
              name={trait} value={counter++}
              onClick={handleTrait}
            >
              {option}
            </Button>
          ))}
        </ButtonGroup>
      </div>
    );
  };

  const newForm = () => (
    <Form validated={validated} onSubmit={handleSubmit} name={id}>
      <h2>We appreciate your feedback!</h2>
          <h4>
            Please take a minute to share your feedback on&nbsp;
            {name}
            .
          </h4>
      <Form.Group controlId="StarRating">
        <Form.Label>How would you rate this product? (Required)</Form.Label>
        <Form.Control
          required
          value={star > 0 ? `You currently selected ${star} stars` : 'You currently selected no stars'}
          name="star"
          size="sm"
          readOnly
        />
        <div key="inline-radio" className="submit-star">
          <Rating
            name="hover-feedback"
            defaultValue={0}
            value={star}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            onChangeActive={(event, newHover) => {
              setHover(newHover);
            }}
          />
          {star !== null && <Box ml={2}>{labels[hover !== -1 ? hover : star]}</Box>}
        </div>
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="Recommendation">
        <Form.Label>Would you recommend this product?</Form.Label>
        <Form.Check
          name="recommend"
          type="switch"
          id="recommend-switch"
          label="I would recommend this product!"
        />
      </Form.Group>
      <Form.Group controlId="Characteristics">
        <Form.Label>
          Please fill out the following required fields:
          {'\n'}
        </Form.Label>
        {
          traitArr.map((trait) => Buttongroup(trait[0], valueMapper))
        }
        {/* <Form.Check
          name="recommend"
          type="switch"
          id="recommend-switch"
          label="I would recommend this product!"
        /> */}
      </Form.Group>
      <Form.Group controlId="SummaryTextArea">
        <Form.Label>What would you like your review to be called?</Form.Label>
        <Form.Control
          type="text"
          as="textarea"
          // rows={3}
          name="summary"
          placeholder="Example: Best purchase ever!"
        />
        <Form.Text className="text-muted">
          Please know we will only be able to process up to 60 characters.
        </Form.Text>
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="BodyTextArea">
        <Form.Label>What would you like to write about this product?</Form.Label>
        <Form.Control
          required
          type="text"
          as="textarea"
          rows={3}
          name="body"
          placeholder="Why did you like the product or not?"
        />
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">Please write a review</Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="nicknameInput">
        <Form.Label>What Is Your Username?</Form.Label>
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
          placeholder="Please include proper extension, ex: @gmail.com"
        />
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">Please enter a valid email.</Form.Control.Feedback>
        <Form.Text className="text-muted">
          For authentication reasons, you will not be emailed
        </Form.Text>
      </Form.Group>
      <Button variant="outline-dark" type="submit">Submit Question</Button>
      <Button variant="outline-dark" onClick={handleCloseModal}>Close</Button>
    </Form>
  );

  if (filteredList) {
    return (
      <div>
        <style type="text/css">
          {Styles}
        </style>
        <Container className="reviewList">
          {
            filteredList.length ? (
              filteredList.slice(0, 2).map((review) => (
                <Row>
                  <Comment review={review} key={Number(Math.random() * 9999)} />
                </Row>
              ))
            ) : <p />
          }
          { filteredList.slice(2) !== [] ? CollapseText() : <p />}
        </Container>
        <Row>
          <span>
            {filteredList.length > 2 ? displayButton() : <p />}
            <Button className="review-submit" variant="outline-dark" size="lg" type="submit" onClick={handleOpenModal}>ADD A REVIEW +</Button>
          </span>
          <ReactModal
            isOpen={showModal}
            contentLabel="Add Question Modal"
            style={{
              overlay: {
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
              },
            }}
          >
            {newForm()}
          </ReactModal>
        </Row>
      </div>
    );
  }

  return <div />;
};

export default CommentList;
