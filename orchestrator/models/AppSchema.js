const { GraphQLSchema } = require('graphql');

const QueryType = require('./types/QueryType');

const AppSchema = new GraphQLSchema({
  query: QueryType,
});

module.exports = AppSchema;
