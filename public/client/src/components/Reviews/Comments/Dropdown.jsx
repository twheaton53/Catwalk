import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const DropdownList = () => (
  <div>
    <span>
      <strong>248 reviews</strong>
      <DropdownButton
        size="sm"
        variant="secondary"
        title="Sort by"
      >
        {/* <Dropdown.ItemText>Dropdown item text</Dropdown.ItemText> */}
        <Dropdown.Item as="button" active>Relevant</Dropdown.Item>
        <Dropdown.Item as="button">Helpful</Dropdown.Item>
        <Dropdown.Item as="button">Newest</Dropdown.Item>
      </DropdownButton>
    </span>
  </div>
);

export default DropdownList;
