const mongoose = require('mongoose')

const Movie = require('../models/Movie')

class MovieCtrl {
  static postMovie (req, res) {
    Movie.create(req.body)
      .then((inserted) => {
        res.code(201).send(inserted);
      })
      .catch((err) => {
        res.code(400).send(err);
      })
  }

  static getMovies (req, res, next) {
    if (req.params.query) {
      Movie.find({
          _id: req.params.movieId
        })
        .then((movies) => {
          res.code(400).send(movies);
        })
    } else {
      Movie.find({})
        .then((movies) => {
          res.code(400).send(movies);
        })
    }
  }

  static updateMovie (req, res, next) {
    Movie.findOneAndUpdate({
        _id: new mongoose.Schema.Types.ObjectId(req.params.movieId)
      }, req.body)
      .then((updated) => {
        res.code(200).send(updated);
      })
      .catch((err) => {
        console.error(err);
        res.code(400).send(err);
      })
  }

  static deleteMovie (req, res, next) {
    Movie.findOneAndRemove({
        _id: new mongoose.Schema.Types.ObjectId(req.params.movieId)
      })
      .then((value) => {
        res.code(200).send(value);
      })
      .catch((err) => {
        console.error(err);
        res.code(400).send(err);
      })
  }

}

module.exports = MovieCtrl
