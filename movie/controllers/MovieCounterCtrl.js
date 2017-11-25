const MovieCounter = require('../models/MovieCounter')

class MovieCounterCtrl {
  static getVersion (req, res, next) {
    MovieCounter.findOne({name: 'movie'})
      .then(({version}) => {
        res.code(400).send({version});
      })
  }
}

module.exports = MovieCounterCtrl
