const MovieCtrl = require('../controllers/MovieCtrl')

module.exports = function (fastify, opts, next) {
  fastify.post('/post_movie', MovieCtrl.postMovie)
  fastify.get('/get_movie', MovieCtrl.getMovies)
  fastify.get('/get_movie/:movieId?', MovieCtrl.getMovies)
  fastify.put('/put_movie/:movieId', MovieCtrl.updateMovie)
  fastify.delete('/delete_movie/:movieId', MovieCtrl.deleteMovie)

  next()
}
