var {
  GraphQLSchema,
} = require('graphql')

var QueryType = require('./helper/QueryType')
let AppSchema = new GraphQLSchema({
  query: QueryType
})

module.exports = AppSchema
