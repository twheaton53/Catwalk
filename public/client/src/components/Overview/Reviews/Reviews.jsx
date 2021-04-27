/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Stars from './Stars';

const Reviews = () => (
  <div className="overview-reviews">
    <Stars />
    <span
      onClick={() => {
        const anchor = document.querySelector('#review-section-id');
        anchor.scrollIntoView();
      }}
      style={{
        fontSize: '1vw', cursor: 'pointer', color: 'blue', textDecoration: 'underline', marginLeft: '5px',
      }}
    >
      Read all reviews
    </span>
  </div>
);

export default Reviews;
