const MovieCtrl = require('../controllers/MovieCtrl')
const MovieCounterCtrl = require('../controllers/MovieCounterCtrl')

module.exports = function (fastify, opts, next) {
  fastify.post('/post_movie', MovieCtrl.postMovie)
  fastify.get('/get_movie', MovieCtrl.getMovies)
  fastify.get('/get_version', MovieCounterCtrl.getVersion)
  fastify.get('/get_movie/:movieId?', MovieCtrl.getMovies)
  fastify.put('/update_movie/:movieId', MovieCtrl.updateMovie)
  fastify.delete('/delete_movie/:movieId', MovieCtrl.deleteMovie)

  next()
}
