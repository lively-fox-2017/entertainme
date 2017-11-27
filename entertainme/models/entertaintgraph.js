const axios = require('axios')
const {
  GraphQLID,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
} = require('graphql');

const MovieType = new GraphQLObjectType({
  name : 'movie',
  fields : {
    _id : { type: new GraphQLNonNull(GraphQLID) },
    title : { type: GraphQLString },
    overview : { type: GraphQLString },
    popularity : { type: GraphQLInt },
    poster_path: { type: GraphQLString },
  }
})


const SerieType = new GraphQLObjectType({
  name : 'serie',
  fields : {
    _id : { type: new GraphQLNonNull(GraphQLID) },
    title : { type: GraphQLString },
    overview : { type: GraphQLString },
    popularity : { type: GraphQLInt },
    poster_path: { type: GraphQLString },
  }
})



const appQuery = new GraphQLObjectType({
  name: 'Query',
  fields: {
    movies: {
      type: new GraphQLList(MovieType),
      resolve: async ()=> {
        const axmovie = await axios.get('http://localhost:3001/movies')
        return axmovie.data.data
      }
    },
    series: {
      type: new GraphQLList(SerieType),
      resolve: async ()=> {
        const axserie = await axios.get('http://localhost:3002/TV')
        return axserie.data.data
      }
    },
  },
});

const appSchema = new GraphQLSchema({
  query: appQuery,
});

module.exports = appSchema;
