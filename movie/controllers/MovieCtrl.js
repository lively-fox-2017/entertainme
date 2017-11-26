const mongoose = require('mongoose')

const Movie = require('../models/Movie')

class MovieCtrl {
  static postMovie (req, res) {
    Movie.create(req.body)
      .then((inserted) => {
        res.status(201).json(inserted);
      })
      .catch((err) => {
        res.status(400).json(err);
      })
  }

  static getMovies (req, res, next) {
    if (req.params.query) {
      Movie.find({
          _id: req.params.movieId
        })
        .then((movies) => {
          res.status(400).json(movies);
        })
    } else {
      Movie.find({})
        .then((movies) => {
          res.status(400).json(movies);
        })
    }
  }

  static updateMovie (req, res, next) {
    Movie.findOneAndUpdate({
        _id: new mongoose.Types.ObjectId(req.params.movieId)
      }, req.body)
      .then((updated) => {
        res.status(200).json(updated);
      })
      .catch((err) => {
        console.error(err);
        res.status(400).json(err);
      })
  }

  static deleteMovie (req, res, next) {
    Movie.findOneAndRemove({
        _id: new mongoose.Types.ObjectId(req.params.movieId)
      })
      .then((value) => {
        res.status(200).json(value);
      })
      .catch((err) => {
        console.error(err);
        res.status(400).json(err);
      })
  }

}

module.exports = MovieCtrl
