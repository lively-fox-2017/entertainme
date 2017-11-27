'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const { buildSchema } = require('graphql');
const graphqlHTTP = require('express-graphql');

const app = express();

const schema = buildSchema(`
  type Entertainme {
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
    movies: [Entertainme],
    tvs: [Entertainme],
    getMovieById(_id: ID!): Entertainme,
    getTvById(_id: ID!): Entertainme,
    getMovieWithPopularityMoreThan(popularity: Float): [Entertainme],
    getTvWithPopularityMoreThan(popularity: Float): [Entertainme]
  }
`);

const root = {
  movies: async () => {
    try {
      const { data } = await axios.get('http://localhost:3001/movie');
      return data.payload;
    } catch (err) {
      return err;
    }
  },

  tvs: async () => {
    try {
      const { data } = await axios.get('http://localhost:3002/tv');
      return data.payload;
    } catch (err) {
      return err;
    }
  },

  getMovieById: async ({_id}) => {
    try {
      const { data } = await axios.get(`http://localhost:3001/movie/${_id}`);
      return data.payload;
    } catch (err) {
      return err;
    }
  },

  getTvById: async ({_id}) => {
    try {
      const { data } = await axios.get(`http://localhost:3002/tv/${_id}`);
      return data.payload;
    } catch (err) {
      return err;
    }
  },

  getMovieWithPopularityMoreThan: async ({popularity}) => {
    try {
      const { data } = await axios.get('http://localhost:3001/movie');
      return data.payload.filter(movie => movie.popularity >= popularity);
    } catch (err) {
      return err;
    }
  },

  getTvWithPopularityMoreThan: async ({popularity}) => {
    try {
      const { data } = await axios.get('http://localhost:3002/tv');
      return data.payload.filter(tv => tv.popularity >= popularity);
    } catch (err) {
      return err;
    }
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