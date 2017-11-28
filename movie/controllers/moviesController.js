const Movie = require('../models/movie')

module.exports = {
  findAll: (req, res) => {
    Movie.find().then((response) => {
      res.status(200).json({
        info: "Movies found successfully",
        data: response
      })
    }).catch((reason) => {
      res.status(400).json({
        info: reason
      })
    })
  },

  insert: (req, res) => {
    Movie.create(req.body).then((response) => {
      res.status(200).json({
        message: "Movie successfully added",
        data: response
      })
    }).catch((reason) => {
      res.status(400).json({
        message: reason
      })
    })
  },

  update: (req, res) => {
    Movie.update({_id: req.params.id}, {$set: req.body}).then((response) => {
      res.status(200).json({
        message: "Movie successfully updated",
        data: response
      }).catch((reason) => {
        res.status(400).json({
          message: reason
        })
      })
    })
  },

  delete: (req, res) => {
    Movie.remove({_id: req.params.id}).then((response) => {
      res.status(200).json({
        message: "Movie successfully deleted",
        data: response
      })
    }).catch((reason) => {
      res.status(400).json({
        message: reason
      })
    })
  }
}
