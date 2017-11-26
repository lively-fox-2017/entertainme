const MovieCounter = require('../models/MovieCounter')

class MovieCounterCtrl {
  static getVersion (req, res, next) {
    MovieCounter.findOne({name: 'movie'})
      .then(data => {
        if (data) {
          console.log(data);
          res.status(200).json(data.version)
        } else {
          res.status(200).json(data)
        }
      })
      .catch(reason => {
        console.error(reason)
        res.status(400).json(reason)
      })
  }
}

module.exports = MovieCounterCtrl
