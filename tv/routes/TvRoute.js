const TvCtrl = require('../controllers/TvCtrl')
const TvCounterCtrl = require('../controllers/TvCounterCtrl')

module.exports = function (fastify, opts, next) {
  fastify.post('/post_tv', TvCtrl.postTv)
  fastify.get('/get_tv', TvCtrl.getTvs)
  fastify.get('/get_version', TvCounterCtrl.getVersion)
  fastify.get('/get_tv/:tvId?', TvCtrl.getTvs)
  fastify.put('/update_tv/:tvId', TvCtrl.updateTv)
  fastify.delete('/delete_tv/:tvId', TvCtrl.deleteTv)

  next()
}
