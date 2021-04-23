/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Button from './components/button/button';
import Reviews from './components/Reviews/Reviews';
import Overview from './components/Overview/Main/Main';
import Questions from './components/Q&A/Main';
import ProductInfo from './store/product';
<<<<<<< HEAD
import config from '../../../config/config.js';
=======
import config from '../../../config/config';
>>>>>>> origin

const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products';
const auth = {
  headers: {
    Authorization: config.TOKEN,
  },
};

const App = () => {
  const [initialId, setInitialId] = useState();

  useEffect(() => {
    axios.get(url, auth)
      .then((result) => {
        setInitialId(result.data[0].id);
      });
  }, []);

  return (
    <ProductInfo.Provider
      value={{
        id: initialId,
      }}
    >
      <Button label="click me please" />
      <div>So Fetch</div>
      <h2>Displaying Product section</h2>
      <Overview />
      <h2>Displaying Related Product section</h2>
      <Questions />
      <h2>Displaying Review section</h2>
      <Reviews />
    </ProductInfo.Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));

export default App;
