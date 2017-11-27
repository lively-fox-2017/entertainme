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
    tvs: [Tv]
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