const fastify = require('fastify')()
const responseTime = require('response-time')
const cache = require('./lib/caching/cache')

fastify.use(responseTime())

fastify.get('/api/entertainme', async function (request, reply) {
  var movies = await cache.getMoviesData()
  var series = await cache.getTvData()
  reply.send({
    status: 'ok',
    movies: movies,
    series: series
  })
})

fastify.listen(3000, function (err) {
  if (err) throw err
  console.log(`Entertain Me Endpoint listening on port ${fastify.server.address().port}`)
})
