var {
  GraphQLID,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
} = require('graphql')

let TvSeriesType = new GraphQLObjectType({
  name: 'TvSeries',
  description: 'Movie Object',
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    poster_path: {
      type: GraphQLString,
    },
    overview: {
      type: GraphQLString,
    },
    title: {
      type: GraphQLString,
    },
    popularity: {
      type: GraphQLString,
    },
    tag : {
      type: new GraphQLList(GraphQLString)
    }
  })
})

module.exports = TvSeriesType
