/* eslint-disable import/extensions */
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Reviews from './components/Reviews/Reviews';
import Overview from './components/Overview/Main/Main';
import Questions from './components/Q&A/Main';
import NavBar from './components/NavBar/NavBar';
import ProductInfo from './store/product';
import config from '../../../config/config';

const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      allProducts: [],
      prodId: null,
      prodName: null,
      search: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const configs = {
      headers: {
        Authorization: config.TOKEN,
      },
      params: {
        page: Infinity,
        count: Infinity,
      },
    };
    axios.get(url, configs)
      .then((result) => {
        this.setState({
          allProducts: result.data.slice(0, 10),
          prodId: result.data[4].id,
          prodName: result.data[4].name,
        });
      })
      .catch((err) => {
        throw err;
      });
  }

  handleChange(newValue) {
    this.setState({
      prodId: newValue.id,
      prodName: newValue.name,
    });
  }

  // useEffect(() => {
  //   axios.get(url, auth)
  //     .then((result) => {
  //       setid(result.data[2].id);
  //       setname(result.data[2].name);
  //     });
  // });

  render() {
    const {
      prodId, prodName, search, allProducts,
    } = this.state;
    return (
      <ProductInfo.Provider
        value={{
          id: prodId,
          name: prodName,
        }}
      >
        <NavBar value={search} searchFunc={this.handleChange} products={allProducts} />
        <Overview />
        <Questions prodName={prodName} prodId={prodId} />
        <div id="review-section-id" />
        <Reviews />
      </ProductInfo.Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

export default App;
