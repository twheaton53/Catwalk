/* eslint-disable no-console */
const express = require('express');
const compression = require('compression');
const path = require('path');

const port = 3030;

const app = express();

app.use(compression());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public/client/dist')));

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
