const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const responseTime = require('response-time')
const router = require('./routes/entertaiment')
const redis = require("redis")
const client = redis.createClient(6379)
const axios = require('axios')
app.use(cors())
const graphQLHTTP = require('express-graphql');
const {
  GraphQLID,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLSchema,
} = require('graphql');

const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: {
    _id: {
      type:  new GraphQLNonNull(GraphQLString),
    },
    title: {
      type:  new GraphQLNonNull(GraphQLString),
    },
    overview: {
      type:  new GraphQLNonNull(GraphQLString)
    },
    poster_path: {
      type:  new GraphQLNonNull(GraphQLString)
    },
    popularity: {
      type:  new GraphQLNonNull(GraphQLInt)
    },
    tag: { 
      type: new GraphQLNonNull(new GraphQLList(GraphQLString))
    }
  },
});
const TvType = new GraphQLObjectType({
  name: 'Tv',
  fields: {
    _id: {
      type:  new GraphQLNonNull(GraphQLString),
    },
    title: {
      type:  new GraphQLNonNull(GraphQLString),
    },
    overview: {
      type:  new GraphQLNonNull(GraphQLString)
    },
    poster_path: {
      type:  new GraphQLNonNull(GraphQLString)
    },
    popularity: {
      type:  new GraphQLNonNull(GraphQLInt)
    },
    tag: { 
      type: new GraphQLNonNull(new GraphQLList(GraphQLString))
    }
  },
});

const movieQuery = new GraphQLObjectType({
  name: 'Query',
  fields: {
    movie: {
      type: new GraphQLList(MovieType),
      resolve: (root) => new Promise((resolve, reject) => {
        axios.get('http://localhost:3001/movie')
        .then(response => {
          resolve(response.data.data);
        })
        .catch(err => {
          res.send(err)
        })
      }),
    }
  },
});
const tvQuery = new GraphQLObjectType({
  name: 'Query',
  fields: {
    tv: {
      type: new GraphQLList(TvType),
      resolve: (root) => new Promise((resolve, reject) => {
        axios.get('http://localhost:3002/tv')
        .then(response => {
          resolve(response.data.data);
        })
        .catch(err => {
          res.send(err)
        })
      }),
    }
  },
});

const movieSchema = new GraphQLSchema({
  query: movieQuery,
});
const tvSchema = new GraphQLSchema({
  query: tvQuery,
});

app.use('/movie', graphQLHTTP({
  schema: movieSchema,
  graphiql: true,
}));
app.use('/tv', graphQLHTTP({
  schema: tvSchema,
  graphiql: true,
}));

app.get('/', (req, res) => {
  res.send('Welcome!!! use /graphql to visit graphiql :D');
});

app.listen(3000, function (err) {
 if (err) throw err
 console.log(`server listening on 3000`)
})




