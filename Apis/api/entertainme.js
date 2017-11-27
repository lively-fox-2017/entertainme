const express = require('express');
const axios = require('axios');
const redis = require('redis');
const client = redis.createClient();

const router = express.Router();

router.get('/', async (req, res) => {
  // res.send((Math.floor(Date.now() / 1000)).toString());
  const lastDataUpdate = await new Promise(function(resolve, reject) {
    client.get("lastDataUpdate", (err, reply) => {
      if (err) {
        reject(err);
      } else {
        resolve(reply);
      }
    });
  });

  let returnedValue = null;
  const cachedItem = await new Promise(function(resolve, reject) {
    client.get("returnedValue", (err, reply) => {
      if (err) {
        reject(err);
      } else {
        resolve(reply);
      }
    });
  });

  if (!cachedItem) {
    const movie = await axios.get('http://localhost:3001/movie/');
    const tvseries = await axios.get('http://localhost:3002/tvseries');

    returnedValue = {
      movie: movie.data,
      tvSeries: tvseries.data,
    }

    client.set("returnValue", JSON.stringify(returnedValue), 'EX', 100)
  } else {
    console.log(cachedItem);
    returnedValue = JSON.parse(cachedItem);
  }

  res.status(200).send(returnedValue);
  // res.send('asd')
})

module.exports = router;
