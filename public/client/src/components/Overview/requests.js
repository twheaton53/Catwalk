import axios from 'axios';

const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products';

const requests = {
  getAll: (callback) => {
    axios.get(url, {
      headers: {
        Authorization: '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',
      },
    })
      .then((result) => callback(result));
  },

  getId: (id, callback) => {
    axios.get(`url/${id}`, {
      headers: {
        Authorization: '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',
      },
    })
      .then((result) => callback(result));
  },
};

export default requests;
