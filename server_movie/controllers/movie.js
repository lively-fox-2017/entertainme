const movie = require('../models/movie')

class Movie {
  static findAll(req,reply){
    movie.find({})
    .then(row => {
      reply.status(200).json({
        "info":"movie found succesfully",
        "data":rows
      })
    })
  }
}

module.exports = Movie
