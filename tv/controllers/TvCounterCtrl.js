const TvCounter = require('../models/TvCounter')

class TvCounterCtrl {
  static getVersion (req, res, next) {
    TvCounter.findOne({name: 'tv'})
      .then((data) => {
        if (data){
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

module.exports = TvCounterCtrl
