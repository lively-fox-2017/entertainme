'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const { buildSchema } = require('graphql');
const graphqlHTTP = require('express-graphql');

const app = express();

const schema = buildSchema(`
  type Movie {
    _id: ID!,
    updatedAt: String,
    createdAt: String,
    title: String,
    overview: String,
    poster_path: String,
    popularity: Float,
    tag: [String],
    status: String
  }

  type Tv {
    _id: ID!,
    updatedAt: String,
    createdAt: String,
    title: String,
    overview: String,
    poster_path: String,
    popularity: Float,
    tag: [String],
    status: String
  }

  type Query {
    movies: [Movie],
    tvs: [Tv],
    getMovieById(_id: ID!): Movie,
    getTvById(_id: ID!): Tv,
    getMovieWithPopularityMoreThan(popularity: Float): [Movie],
    getTvWithPopularityMoreThan(popularity: Float): [Tv]
  }
`);

const root = {
  movies: () => {
    return new Promise ((resolve, reject) => {
      axios.get('http://localhost:3001/movie')
      .then(resp => {
        resolve(resp.data.payload);
      })
      .catch(err => {
        reject(err);
      });
    });
  },

  tvs: () => {
    return new Promise((resolve, reject) => {
      axios.get('http://localhost:3002/tv')
      .then(resp => {
        resolve(resp.data.payload);
      })
      .catch(err => {
        reject(err);
      });
    });
  },

  getMovieById: ({_id}) => {
    return new Promise((resolve, reject) => {
      axios.get(`http://localhost:3001/movie/${_id}`)
      .then(resp => {
        resolve(resp.data.payload);
      })
      .catch(err => {
        reject(err);
      });
    });
  },

  getTvById: ({_id}) => {
    return new Promise((resolve, reject) => {
      axios.get(`http://localhost:3002/tv/${_id}`)
      .then(resp => {
        resolve(resp.data.payload);
      })
      .catch(err => {
        reject(err);
      });
    });
  },

  getMovieWithPopularityMoreThan: ({popularity}) => {
    return new Promise((resolve, reject) => {
      axios.get('http://localhost:3001/movie')
      .then(resp => {
        const movies = resp.data.payload.filter(movie => movie.popularity >= popularity)
        resolve(movies);
      })
      .catch(err => {
        reject(err);
      });
    });
  },

  getTvWithPopularityMoreThan: ({popularity}) => {
    return new Promise((resolve, reject) => {
      axios.get('http://localhost:3002/tv')
      .then(resp => {
        const tvs = resp.data.payload.filter(tv => tv.popularity >= popularity)
        resolve(tvs);
      })
      .catch(err => {
        reject(err);
      });
    });
  }
};

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`entertainme graphql server running on port ${PORT}`));