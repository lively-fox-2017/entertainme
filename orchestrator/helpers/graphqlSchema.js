const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLFloat,
  GraphQLList,
  GraphQLSchema
} = require('graphql')

const getMoviesData = require('./getMoviesData')
const getTvsData = require('./getTvsData')

const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: {
    _id: {
      type: GraphQLString
    },
    poster_path: {
      type: GraphQLString
    },
    overview: {
      type: GraphQLString
    },
    title: {
      type: GraphQLString
    },
    popularity: {
      type: GraphQLFloat
    },
    updatedAt: {
      type: GraphQLString
    },
    createdAt: {
      type: GraphQLString
    }
  }
})
const TvType = new GraphQLObjectType({
  name: 'Tv',
  fields: {
    _id: {
      type: GraphQLString
    },
    poster_path: {
      type: GraphQLString
    },
    overview: {
      type: GraphQLString
    },
    title: {
      type: GraphQLString
    },
    popularity: {
      type: GraphQLFloat
    },
    updatedAt: {
      type: GraphQLString
    },
    createdAt: {
      type: GraphQLString
    }
  }
})
const MoviesResultType = new GraphQLObjectType({
  name: 'MoviesResult',
  fields: {
    movies: {
      type: new GraphQLList(MovieType)
    },
    source: {
      type: GraphQLString
    }
  }
})
const TvsResultType = new GraphQLObjectType({
  name: 'TvsResult',
  fields: {
    tvs: {
      type: new GraphQLList(TvType)
    },
    source: {
      type: GraphQLString
    }
  }
})
const appQuery = new GraphQLObjectType({
  name: 'Query',
  fields: {
    movies: {
      type: MoviesResultType,
      resolve: async function () { return getMoviesData() }
    },
    tvs: {
      type: TvsResultType,
      resolve: async function () { return getTvsData() }
    }
  }
})
const rootSchema = new GraphQLSchema({
  query: appQuery
})

module.exports = rootSchema
