const {
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
} = require('graphql');

const Fields = {
  _id: {
    type: new GraphQLNonNull(GraphQLID),
  },
  title: {
    type: new GraphQLNonNull(GraphQLString),
  },
  overview: {
    type: GraphQLString,
  },
  poster_path: {
    type: GraphQLString,
  },
  popularity: {
    type: GraphQLInt,
  },
  tag: {
    type: new GraphQLList(GraphQLString),
  },
  status: {
    type: GraphQLString,
  },
};

const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => Fields,
});

module.exports = MovieType;
