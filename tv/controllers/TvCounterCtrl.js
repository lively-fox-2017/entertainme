const TvCounter = require('../models/TvCounter')

class TvCounterCtrl {
  static getVersion (req, res, next) {
    TvCounter.findOne({name: 'tv'})
      .then((value) => {
        res.code(400).send(value)
      })
  }
}

module.exports = TvCounterCtrl
