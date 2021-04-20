/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import regeneratorRuntime from 'regenerator-runtime';

const StyledDescription = styled.div`
  border: 1px solid black;
  color: purple;
  .slogan {
    color: black
  }
`;

const Description = ({ currentProduct }) => (
  <StyledDescription>
    <h3 className="slogan">{currentProduct.slogan}</h3>
    <p>{currentProduct.description}</p>
  </StyledDescription>
);

export default Description;
