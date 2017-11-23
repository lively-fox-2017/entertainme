const mongoose = require('mongoose')

const Tv = require('../models/Tv')

class TvCtrl {
  static postTv (req, res) {
    Tv.create(req.body)
      .then((inserted) => {
        res.code(201).send(inserted);
      })
      .catch((err) => {
        res.code(400).send(err);
      })
  }

  static getTvs (req, res, next) {
    if (req.params.query) {
      Tv.find({
          _id: req.params.tvId
        })
        .then((tvs) => {
          res.code(400).send(tvs);
        })
    } else {
      Tv.find({})
        .then((tvs) => {
          res.code(400).send(tvs);
        })
    }
  }

  static updateTv (req, res, next) {
    Tv.findOneAndUpdate({
        _id: new mongoose.Schema.Types.ObjectId(req.params.tvId)
      }, req.body)
      .then((updated) => {
        res.code(200).send(updated);
      })
      .catch((err) => {
        console.error(err);
        res.code(400).send(err);
      })
  }

  static deleteTv (req, res, next) {
    Tv.findOneAndRemove({
        _id: new mongoose.Schema.Types.ObjectId(req.params.tvId)
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

module.exports = TvCtrl
