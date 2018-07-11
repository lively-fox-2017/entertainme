const fastify = require('fastify')()
const responseTime = require('response-time')
const { makeExecutableSchema } = require('graphql-tools')
const { graphqlFastify, graphiqlFastify } = require('fastify-apollo')
const cache = require('./lib/caching/cache')

const typeDefs = `
  type Movie {
    _id: ID!
    title: String!
    overview: String!
    poster_path: String!
    popularity: Float
    status: String
    tags: [String]
  }
  type Movies {
    source: String
    data: [Movie]
  }
  type Serie {
    _id: ID!
    title: String!
    overview: String!
    poster_path: String!
    popularity: Float
    status: String
    tags: [String]
  }
  type Series {
    source: String
    data: [Series]
  }
  type Query {
    movies: Movies
    series: Series
  }
`

const resolvers = {
  Movies: async() => {
      var {data, source} = await cache.getMoviesData()
      return {
        source,
        data
      }
    // data: async function() {
    //   var {data} = await cache.getMoviesData()
    //   return data
    // },
    // source: async function() {
    //   var {source} = await cache.getMoviesData()
    //   return source
    // },
  },
  Series: async() => {
    var {data, source} = await cache.getTvData()
    return {
      source,
      data
    }
    // data: async function() {
    //   var {data} = await cache.getTvData()
    //   return data
    // },
    // source: async function() {
    //   var {source} = await cache.getTvData()
    //   return source
    // },
  },
  Query: {
    movies: () => resolvers.Movies(),
    series: () => resolvers.Series()
  }
}


fastify.use(responseTime())

fastify.get('/api/entertainme', async function (request, reply) {
  var movies = await cache.getMoviesData()
  var series = await cache.getTvData()
  reply.send({
    status: 'ok',
    movies: {
      source: movies.source,
      movies: movies.data
    },
    series: {
      source: series.source,
      movies: series.data
    }
  })
})

const schema = makeExecutableSchema({ typeDefs, resolvers })

fastify
  .register(graphqlFastify, {
    schema,
    printSchema: true
  })
  .register(graphiqlFastify, {
    endpointURL: '/',
    prefix: '/graphiql'
  })

// fastify.register(require("fastify-apollo"), {
//     graphql: schema,
//     graphiql: {
//       endpointURL: "/",
//       prefix: "/graphiql"
//     },
//     prefix: "/api",
//     printSchema: true // `/api/schema`
// });
fastify.register(require('fastify-apollo'), {
  graphql: {
    schema
  },
  graphiql: {
    endpointURL: '/',
    prefix: '/graphiql'
  },
  prefix: '/graphql'
}, err => {
  if (err) {
    throw err
  }
})

fastify.listen(3000, function (err) {
  if (err) throw err
  console.log(`Entertain Me Endpoint listening on port ${fastify.server.address().port}`)
})
