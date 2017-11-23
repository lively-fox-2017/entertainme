const Movie = require('../models/movie')

class MovieCtrl {
  static async read (req, res) {
    var response = await Movie.read()
    res.send(response)
  }
  static async readOne (req, res) {
    var response = await Movie.readOne(req.params.id)
    res.send(response)
  }
  static async create (req, res) {
    var response = await Movie.create(req.body)
    res.send(response)
  }
  static async update (req, res) {
    var response = await Movie.update(req.params.id, req.body)
    res.send(response)
  }
  static async delete (req, res) {
    var response = await Movie.delete(req.params.id)
    res.send(response)
  }
}

module.exports = MovieCtrl
