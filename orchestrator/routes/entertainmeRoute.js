const EntertainmeCtrl = require('../controllers/EntertainmeCtrl');

module.exports = (fastify, opt, next) => {
  fastify.get('/', EntertainmeCtrl.getEntertainment)

  next()
}
