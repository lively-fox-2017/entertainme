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
  popularity: {
    type: GraphQLInt,
  },
  tag: {
    type: new GraphQLList(GraphQLString),
  }
};

const SeriesType = new GraphQLObjectType({
  name: 'Series',
  fields: () => Fields,
});

module.exports = SeriesType;
