'use strict'
const fastify = require('fastify')()
const axios = require('axios')
const cors = require('cors');
const bodyParser = require('fastify-formbody');
const redis = require("redis"),
    client = redis.createClient(6379);
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

// fastify.get('/', (req, reply) => {
//   reply.send({server_name : 'entertainme server'})
// })

fastify.get('/entertainme', async function (req, reply) {
  try {
    let promiseEntertainme = () => {
      return new Promise((resolve,reject) => {
        client.get('entertainme', (err,reply)=>{
          if (err) {
            reject(err)
          } else {
            resolve(reply)
          }
        })
      })
    }

    let dataRedis = await promiseEntertainme()

    if (dataRedis) {
      reply.send(JSON.parse(dataRedis))
      console.log('---------------------get from redis\n',dataRedis);
    } else {
      var dataMovies = await axios.get('http://localhost:3001/movies')
      var dataTvSseries = await axios.get('http://localhost:3002/tv_series')
      var dataEntertainme = {
        "movies":dataMovies.data,
        "series":dataTvSseries.data
      }
      console.log('----------------------get from api\n', dataEntertainme);
      client.set("entertainme", JSON.stringify(dataEntertainme));
      client.set('entertainme', JSON.stringify(dataEntertainme), 'EX', 10);
      reply.send({
        "movies":dataMovies.data,
        "series":dataTvSseries.data
      })
    }
  } catch (e) {
    console.log(e);
  }
})

fastify.listen(3000, err => {
  if (err) throw err
  console.log(`server listening on ${fastify.server.address().port}`);
})
