const axios = require('axios')
const {
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLObjectType
} = require('graphql')

const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: {
    _id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    title: {
      type: new GraphQLNonNull(GraphQLString)
    },
    popularity: {
      type: GraphQLInt
    },
    tag: {
      type: new GraphQLList(GraphQLString)
    }
  }
})

const TVType = new GraphQLObjectType({
  name: 'TV',
  fields: {
    _id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    title: {
      type: new GraphQLNonNull(GraphQLString)
    },
    popularity: {
      type: GraphQLInt
    },
    tag: {
      type: new GraphQLList(GraphQLString)
    }
  }
})

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    movies: {
      type: new GraphQLList(MovieType),
      resolve: () => {
        return new Promise((resolve, reject) => {
          axios.get('http://localhost:3001/movies').then(({data}) => {
            resolve(data.data)
          }).catch((reason) => {
            reject(reason)
          })
        })
      }
    },
    tv: {
      type: new GraphQLList(TVType),
      resolve: () => {
        return new Promise((resolve, reject) => {
          axios.get('http://localhost:3002/tv').then(({data}) => {
            resolve(data.data)
          }).catch((reason) => {
            reject(reason)
          })
        });
      }
    }
  }
})

const appSchema = new GraphQLSchema({
  query: queryType
})

module.exports = appSchema;
