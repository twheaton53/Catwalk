import React from 'react';
import ReactDOM from 'react-dom';
import Button from '../button';

// eslint-disable-next-line no-undef
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Button />, div);
});
