const fastify = require('fastify')()
const Movies = require('./lib/movieAPI/movies')
const Tv = require('./lib/tvAPI/tv')

fastify.get('/api/entertainme', async function (request, reply) {
  const movieData = await Movies.getMovies()
  const tvData = await Tv.getTvSeries()

  reply.send({
    status: 'ok',
    movies: movieData,
    series: tvData
  })
})

fastify.listen(3000, function (err) {
  if (err) throw err
  console.log(`Entertain Me Endpoint listening on port ${fastify.server.address().port}`)
})
