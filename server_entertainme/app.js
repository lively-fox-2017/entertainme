'use strict'
const fastify = require('fastify')()
const axios = require('axios')
const cors = require('cors');
const bodyParser = require('fastify-formbody');
const responseTime = require('response-time')()
const { graphqlFastify,graphiqlFastify } = require("fastify-apollo");

const AppSchema = require('./schema')

fastify.use(cors())

fastify.register(bodyParser, {})

fastify.register(graphqlFastify, {
  schema: AppSchema,
  prefix: "/graphql"
})

fastify.register(graphiqlFastify, {
  endpointURL: "/graphql",
  prefix: "/graphiql"
})

fastify.get('/', (req, reply) => {
  reply.send({server_name : 'entertainme server'})
})

fastify.listen(3000, err => {
  if (err) throw err
  console.log(`server listening on ${fastify.server.address().port}`);
})
