// .src/index.js

// importing dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const {startDatabase} = require('./database/mongo');
const {insertAd, getAds} = require('./database/ads');
const {deleteAd, updateAd} = require('./database/ads');

// define Express app
const app = express();

// adding Helmet to enhance API security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// add morgan to log HTTP requests
app.use(morgan('combined'));

// defining an endpoint to return all ads
app.get('/', async (req, res) => {
  res.send(await getAds());
});

app.post('/', async (req, res) => {
  const newAd = req.body;
  await insertAd(newAd);
  res.send({ message: 'New ad inserted.' });
});

app.delete('/:id', async (req, res) => {
  await deleteAd(req.params.id);
  res.send({ message: 'Ad removed' });
});

app.put('/:id', async (req, res) => {
  const updatedAd = req.body;
  await updateAd(req.params.id, updatedAd);
  res.send({ message: 'Ad updated' });
});

// start the in-memory MongoDB instance
startDatabase().then(async () => {
  //start the server
  app.listen(3001, async () => {
    console.log('listening on port 3001');
  });
});
