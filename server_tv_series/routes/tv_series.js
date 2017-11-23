const movie = require('../controllers/tv_series');

module.exports = function (fastify,opts, next) {
  fastify.get('/movies', async function (req, reply){
    var data = await movie.findAll()
    reply.send(data)
  })
}
module.exports = function (fastify,opts, next) {
  fastify.get('/', (req, reply) => {
    reply.send({server_name : 'tv_series server'})
  })
}
