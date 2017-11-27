var {
  GraphQLList,
  GraphQLInt,
  GraphQLString,
  GraphQLObjectType,
  GraphQLSchema,
} = require('graphql')
var MovieType = require('./MovieType')
var TvSeriesType = require('./TvSeriesType')
var axios = require('axios')

let QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    movies: {
      type: new GraphQLList(MovieType),
      resolve: () => {
        return new Promise((resolve, reject) => {
          axios.get('http://localhost:3001/movies')
          .then(data => {
              // console.log('asdfasdss', data.data.data);
            resolve(data.data.data)
          })
        })
      }
    },
    tv_series: {
      type: new GraphQLList(TvSeriesType),
      resolve: () => {
        return new Promise((resolve, reject) => {
          axios.get('http://localhost:3002/tv_series')
          .then(data => {
              // console.log('asdfasdss', data.data.data);
            resolve(data.data.data)
          })
        })
      }
    }
  })
})

module.exports = QueryType
