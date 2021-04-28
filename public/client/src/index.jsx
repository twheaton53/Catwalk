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
const auth = {
  headers: {
    Authorization: config.TOKEN,
  },
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      initialId: null,
      initialName: null,
    };
  }

  componentDidMount() {
    axios.get(url, auth)
      .then((result) => {
        this.setState({
          initialId: result.data[2].id,
          initialName: result.data[2].name,
        }, () => console.log(this.state));
      })
      .catch((err) => {
        throw err;
      });
  }

  // useEffect(() => {
  //   axios.get(url, auth)
  //     .then((result) => {
  //       setInitialId(result.data[2].id);
  //       setInitialName(result.data[2].name);
  //     });
  // });

  render() {
    const { initialId, initialName } = this.state;
    return (
      <ProductInfo.Provider
        value={{
          id: initialId,
          name: initialName,
        }}
      >
        <NavBar />
        <Overview />
        <Questions prodName={initialName} prodId={initialId} />
        <div id="review-section-id" />
        <Reviews />
      </ProductInfo.Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

export default App;
