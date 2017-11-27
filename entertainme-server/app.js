'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const redis = require('redis');

const app = express();
const client = redis.createClient();

client.on("error", function (err) {
    console.log("Error " + err);
});

const checkMoviesOnCache = () => {
  return new Promise((resolve, reject) => {
    client.get('movies', (err, rep) => {
      if (err) reject(err);
      else resolve(rep);
    });
  });
} ;

const checkSeriesOnCache = () => {
  return new Promise((resolve, reject) => {
    client.get('series', (err, rep) => {
      if (err) reject(err);
      else resolve(rep);
    });
  });
};

const checkCache = async (req, res, next) => {
  let movies, series;

  try {
    movies = await checkMoviesOnCache();
    series = await checkSeriesOnCache();
  } catch (err) {
    throw err;
  }

  if (movies && series) {
    res.status(200).send({
      info: 'from redis',
      movies: {
        info: 'movies found successfully!',
        data: JSON.parse(movies)
      },
      series: {
        info: 'tvs found succcessfully',
        data: JSON.parse(series)
      }
    });
  } else {
    next();
  }
};

app.get('/', checkCache, async (req, res) => {
  const moviesApiResponse = await axios.get('http://localhost:3001/movie');
  const tvsApiResponse = await axios.get('http://localhost:3002/tv');

  const movies = moviesApiResponse.data.payload;
  const series = tvsApiResponse.data.payload;

  client.set('movies', JSON.stringify(movies));
  client.set('series', JSON.stringify(series));

  res.status(200).send({
    info: 'from API',
    movies: {
      info: 'movies found successfully!',
      data: movies
    },
    series: {
      info: 'tvs found succcessfully',
      data: series
    }
  });
});

app.get('/thereisupdatedude', (req, res) => {
  client.flushall((err, succeed) => {
    if (err) throw err;
    else res.status(200).send('ok'); 
  })  
});

const port = process.env.PORT || 3000;
app.listen(port, console.log(`entertainme server running on port ${port}`));