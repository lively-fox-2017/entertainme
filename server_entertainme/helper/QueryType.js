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
const MovieModule = require('./MovieModule')
const TvSeriesModule = require('./TvSeriesModule')

let QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    movies: {
      type: new GraphQLList(MovieType),
      resolve: async () => {
        // console.log('ini data movie',await MovieModule());
        return await MovieModule()
      }
    },
    tv_series: {
      type: new GraphQLList(TvSeriesType),
      resolve: async () => {
        // console.log('ini data tv series',await TvSeriesModule());
        return await TvSeriesModule()
      }
    }
  })
})

module.exports = QueryType
