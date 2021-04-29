/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Reviews from './components/Reviews/Reviews';
import Overview from './components/Overview/Main/Main';
import Questions from './components/Q&A/Main';
import NavBar from './components/NavBar/NavBar';
import ProductInfo from './store/product';
import config from '../../../config/config';

const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products';
const auth = {
  headers: {
    Authorization: config.TOKEN,
  },
};

const App = () => {
  const [initialId, setInitialId] = useState();
  const [initialName, setInitialName] = useState();

  useEffect(() => {
    axios.get(url, auth)
      .then((result) => {
        setInitialId(result.data[4].id);
        setInitialName(result.data[4].name);
      });
  }, []);

  return (
    <ProductInfo.Provider
      value={{
        id: initialId,
        name: initialName,
      }}
    >
      <NavBar />
      <Overview />
      <Questions />
      <div id="review-section-id" />
      <Reviews />
    </ProductInfo.Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));

export default App;
