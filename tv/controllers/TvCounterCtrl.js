const TvCounter = require('../models/TvCounter')

class TvCounterCtrl {
  static getVersion (req, res, next) {
    MovieCounter.findOne({name: 'tv'})
      .then(({version}) => {
        res.code(400).send({version});
      })
  }
}

module.exports = TvCounterCtrl
