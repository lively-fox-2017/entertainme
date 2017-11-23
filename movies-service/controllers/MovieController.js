const Movie = require('../models/Movie');
const { flushCache } = require('../helpers');

class MovieController {
  static fetchAll(req, res) {
    Movie
      .find({})
      .sort('-popularity')
      .then((movies) => {
        res.status(200).json(movies);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  }

  static create(req, res) {
    Movie
      .insertMany(req.body)
      .then((movie) => {
        res.status(201).json(movie);
        flushCache();
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  }

  static fetchById(req, res) {
    Movie
      .findById(req.params.id)
      .then((movie) => {
        if (!movie) {
          res.status(404).json({});
        } else {
          res.status(200).json(movie);
        }
      })
      .catch((err) => {
        if (err.kind === 'ObjectId') {
          res.status(404).json({});
        } else {
          res.status(400).json(err);
        }
      });
  }

  static update(req, res) {
    Movie
      .findById(req.params.id)
      .then((movie) => {
        if (!movie) {
          res.status(404).json({});
        } else {
          Movie
            .updateOne({ _id: req.params.id }, req.body)
            .then((response) => {
              res.status(200).json(movie);
              flushCache();
            })
            .catch((err) => {
              res.status(400).json(err);
            });
        }
      })
      .catch((err) => {
        if (err.kind === 'ObjectId') {
          res.status(404).json({});
        } else {
          res.status(400).json(err);
        }
      });
  }

  static delete(req, res) {
    Movie
      .findById(req.params.id)
      .then((movie) => {
        if (!movie) {
          res.status(404).json({});
        } else {
          Movie
            .deleteOne({ _id: req.params.id })
            .then((response) => {
              res.status(200).json(movie);
              flushCache();
            })
            .catch((err) => {
              res.status(400).json(err);
            });
        }
      })
      .catch((err) => {
        if (err.kind === 'ObjectId') {
          res.status(404).json({});
        } else {
          res.status(400).json(err);
        }
      });
  }
}

module.exports = MovieController;
