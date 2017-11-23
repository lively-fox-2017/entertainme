const fastify = require('fastify')()
const responseTime = require('response-time')
const redis = require('redis')
var client = redis.createClient()

const Movies = require('./lib/movieAPI/movies')
const Tv = require('./lib/tvAPI/tv')

fastify.use(responseTime())

fastify.get('/api/entertainme', function (request, reply) {
  client.get("movies&tv", async function(err, res) {
    if(err) {
      console.error('redis error', err)
      reply.send({
        status: 'failed',
      })
    } else {
      if (res) {
        var data = JSON.parse(res)
        reply.send({
          status: 'ok',
          movies: data.movies,
          series: data.series
        })
      } else {
        const movieData = await Movies.getMovies()
        const tvData = await Tv.getTvSeries()
        client.set('movies&tv', JSON.stringify({movies: movieData, series: tvData}));
        reply.send({
          status: 'ok',
          movies: movieData,
          series: tvData
        })
      }
    }
  });
})

fastify.listen(3000, function (err) {
  if (err) throw err
  console.log(`Entertain Me Endpoint listening on port ${fastify.server.address().port}`)
})
