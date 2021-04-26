/* eslint-disable react/prop-types */
import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const DropdownList = ({ reviews }) => {
  const { results } = reviews;

  if (results !== undefined) {
    return (
      <div>
        <span>
          <strong>
            {results.length}
            &nbsp;
            reviews
          </strong>
          <DropdownButton
            size="sm"
            variant="secondary"
            title="sort by"
          >
            {/* <Dropdown.ItemText>Dropdown item text</Dropdown.ItemText> */}
            <Dropdown.Item as="button" active>Relevant</Dropdown.Item>
            <Dropdown.Item as="button">Helpful</Dropdown.Item>
            <Dropdown.Item as="button">Newest</Dropdown.Item>
          </DropdownButton>
        </span>
      </div>
    );
  }

  return <div />;
};

export default DropdownList;
