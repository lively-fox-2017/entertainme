require('dotenv').config();
const {
  GraphQLObjectType,
  GraphQLList,
} = require('graphql');
const axios = require('axios');

const MovieType = require('./MovieType');
const SeriesType = require('./SeriesType');

const moviesService = axios.create({
  baseURL: process.env.MOVIES_SERVICE_URI,
});

const tvSeriesService = axios.create({
  baseURL: process.env.TV_SERIES_SERVICE_URI,
});

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    movies: {
      type: new GraphQLList(MovieType),
      resolve: () => {
        return new Promise((resolve, reject) => {
          moviesService
            .get('/movies')
            .then(({ data }) => resolve(data))
            .catch((err) => reject(err));
        });
      },
    },

    series: {
      type: new GraphQLList(SeriesType),
      resolve: () => {
        return new Promise((resolve, reject) => {
          tvSeriesService
            .get('/tv-series')
            .then(({ data }) => resolve(data))
            .catch((err) => reject(err));
        });
      },
    },
  }),
});

module.exports = QueryType;
