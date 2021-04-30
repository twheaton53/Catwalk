/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { FaFacebookSquare, FaTwitterSquare, FaPinterestSquare } from 'react-icons/fa';

const Socials = () => (
  <div className="socials">
    <span className="social-icon" data-href="https://www.youtube.com/watch?v=jjt9Qx9MBPk" data-layout="button_count" data-size="small"><a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3Djjt9Qx9MBPk&amp;src=sdkpreparse" className="fb-xfbml-parse-ignore" rel="noreferrer"><FaFacebookSquare className="social-icon" /></a></span>
    <a
      className="social-icon"
      href="https://twitter.com/intent/tweet?text=King's%20Clothing%20is%20so%20fetch"
      data-size="large"
    >
      <FaTwitterSquare />
    </a>
    <a
      className="social-icon"
      href="https://www.pinterest.com/pin/139752394664775546/"
      data-pin-do="embedPin"
    >
      <FaPinterestSquare />
    </a>
  </div>
);

export default Socials;
