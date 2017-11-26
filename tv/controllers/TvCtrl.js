const mongoose = require('mongoose')

const Tv = require('../models/Tv')

class TvCtrl {
  static postTv (req, res) {
    Tv.create(req.body)
      .then((inserted) => {
        res.status(201).json(inserted);
      })
      .catch((err) => {
        res.status(400).json(err);
      })
  }

  static getTvs (req, res, next) {
    if (req.params.query) {
      Tv.find({
          _id: req.params.tvId
        })
        .then((tvs) => {
          res.status(400).json(tvs);
        })
    } else {
      Tv.find({})
        .then((tvs) => {
          res.status(400).json(tvs);
        })
    }
  }

  static updateTv (req, res, next) {
    Tv.findOneAndUpdate({
        _id: new mongoose.Types.ObjectId(req.params.tvId)
      }, req.body)
      .then((updated) => {
        res.status(200).json(updated);
      })
      .catch((err) => {
        console.error(err);
        res.status(400).json(err);
      })
  }

  static deleteTv (req, res, next) {
    Tv.findOneAndRemove({
        _id: new mongoose.Types.ObjectId(req.params.tvId)
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

module.exports = TvCtrl
