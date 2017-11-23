require('dotenv').config();
const axios = require('axios');

const moviesService = axios.create({
  baseURL: process.env.MOVIES_SERVICE_URI
});
const tvSeriesService = axios.create({
  baseURL: process.env.TV_SERIES_SERVICE_URI
});

const EntertainMe = {
  fetchEntertainments: async () => {
    try {
      const movies = await moviesService.get('/movies');
      const tvSeries = await tvSeriesService.get('/tv-series');
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
