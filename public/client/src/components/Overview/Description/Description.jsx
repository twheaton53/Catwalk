/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import regeneratorRuntime from 'regenerator-runtime';

const StyledDescription = styled.div`
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
