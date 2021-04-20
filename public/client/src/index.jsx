import React from 'react';
import ReactDOM from 'react-dom';
import Button from './components/button/button';
import Reviews from './components/Reviews/Reviews';
import Overview from './components/Overview/Overview';
import Questions from './components/Questions/Questions';
// import './index.css';

const App = () => (
  <div className="App">
    <Button label="click me please" />
    <div>So Fetch</div>
    <h2>Displaying Product section</h2>
    <Overview />
    <h2>Displaying Related Product section</h2>
    <h2>Displaying QA section</h2>
    <Questions />
    <h2>Displaying Review section</h2>
    <Reviews />
  </div>
);

ReactDOM.render(<App />, document.getElementById('app'));

export default App;
