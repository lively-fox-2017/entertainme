// const fastify = require('fastify')()
const TvController = require('../controller/movies')

console.log('router tv')

module.exports = function (fastify, opts, next) {
    fastify.get('/', TvController.getAll)
    fastify.post('/', TvController.createMovies)
    fastify.get('/single/:id', TvController.singleMovies)
    fastify.put('/:id', TvController.updateMovies)
    fastify.delete('/:id', TvController.removeMovies)
    next()
}