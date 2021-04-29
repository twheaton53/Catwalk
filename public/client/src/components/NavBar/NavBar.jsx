/* eslint-disable arrow-body-style */
/* eslint-disable array-callback-return */
/* eslint-disable react/prop-types */
import React from 'react';
import {
  Container, Row, Col,
} from 'react-bootstrap';
import AsyncCreatableSelect from 'react-select/async-creatable';

const NavBar = (props) => {
  const { searchFunc, products } = props;

  const customFilter = (option, searchText) => {
    if (
      option.label.toLowerCase().includes(searchText.toLowerCase())
    ) {
      return true;
    }
    return false;
  };

  return (
    <Container id="nav-bar">
      <Row>
        <Col>
          <h1 id="shop-name">King&#39;s Clothing</h1>
        </Col>
        <Col>
          <AsyncCreatableSelect
            cacheOptions
            getOptionLabel={(option) => `${option.name}`}
            getOptionValue={(option) => `${option}`}
            defaultOptions={products}
            onChange={searchFunc}
            isSearchable={false}
            theme={(theme) => ({
              ...theme,
              borderRadius: '5px',
              colors: {
                ...theme.colors,
                primary25: '#8789C0',
                primary: '#33202A',
              },
            })}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default NavBar;
