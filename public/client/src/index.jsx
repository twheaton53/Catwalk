import React from 'react';
import ReactDOM from 'react-dom';
import Overview from './components/Overview/Overview';

const App = () => (
  <>
    <h1>So Fetch</h1>
    <Overview />
  </>
);

ReactDOM.render(<App />, document.getElementById('app'));

export default App;
