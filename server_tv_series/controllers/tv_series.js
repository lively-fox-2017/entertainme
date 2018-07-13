const tv_series = require('../models/tv_series')

class TvSeries {
  static findAll(req,reply){
    tv_series.find({})
    .then(row => {
      reply.status(200).json({
        "info":"tv_series found succesfully",
        "data":rows
      })
    })
  }
}

module.exports = TvSeries
