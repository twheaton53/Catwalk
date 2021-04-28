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

  console.log(products);

  const filterProducts = (inputValue) => {
    console.log('triggered filterProducts');
    return products.filter((product) => {
      product.name.toLowerCase().includes(inputValue.toLowerCase());
    });
  };

  const loadOptions = (inputValue, callback) => {
    setTimeout(() => {
      callback(filterProducts(inputValue));
    }, 1000);
  };

  return (
    <Container id="nav-bar">
      <Row>
        <Col>
          <h1 id="shop-name">King&#39;s Clothing</h1>
        </Col>
        <Col>
          {console.log('this is products in render ', products)}
          <AsyncCreatableSelect
            cacheOptions
            getOptionLabel={(option) => `${option.name}`}
            getOptionValue={(option) => `${option}`}
            loadOptions={loadOptions}
            defaultOptions={products}
            onChange={searchFunc}
            theme={(theme) => ({
              ...theme,
              borderRadius: '5px',
              colors: {
                ...theme.colors,
                primary25: '#285943',
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
