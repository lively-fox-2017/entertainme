require('dotenv').config();
const redis       = require('redis'),
      redisClient = redis.createClient();
const axios       = require('axios');

const moviesService = axios.create({
  baseURL: process.env.MOVIES_SERVICE_URI
});
const tvSeriesService = axios.create({
  baseURL: process.env.TV_SERIES_SERVICE_URI
});
const getMoviesCache = () => {
  return new Promise((resolve) => {
    redisClient.get('movies', (err, value) => {
      if (value) {
        resolve(JSON.parse(value));
      } else {
        resolve([]);
      }
    });
  });
};
const getTVSeriesCache = () => {
  return new Promise((resolve) => {
    redisClient.get('tv_series', (err, value) => {
      if (value) {
        resolve(JSON.parse(value));
      } else {
        resolve([]);
      }
    });
  });
};

const EntertainMe = {
  flushCache: () => {
    redisClient.flushall();
  },
  fetchEntertainments: async () => {
    try {
      const moviesCache = await getMoviesCache();
      const tvSeriesCache = await getTVSeriesCache();

      let movies = null;
      let tvSeries = null;

      if (!moviesCache.length) {
        movies = await moviesService.get('/movies');
        redisClient.set('movies', JSON.stringify(movies.data));
      } else {
        movies = { data: moviesCache };
      }

      if (!tvSeriesCache.length) {
        tvSeries = await tvSeriesService.get('/tv-series');
        redisClient.set('tv_series', JSON.stringify(tvSeries.data));
      } else {
        tvSeries = { data: tvSeriesCache };
      }

      return {
        movies: {
          info: 'Movies successfully fetched',
          data: movies.data
        },
        series: {
          info: 'TV Series successfully fetched',
          data: tvSeries.data
        },
      };
    } catch (err) {
      return err;
    }
  },
};

module.exports = EntertainMe;
