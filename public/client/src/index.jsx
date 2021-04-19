import React from 'react';
import ReactDOM from 'react-dom';
import Button from './components/button/button';

const App = () => (
  <div className="App">
    <Button label="click me please" />
    <div>So Fetch</div>
  </div>
);

ReactDOM.render(<App />, document.getElementById('app'));

export default App;
