const TV = require('../models/tv')

module.exports = {
  findAll: async (req, res) => {
    try {
      const getTV = await TV.find()
      res.status(200).json({
        info: "TV found successfully",
        data: getTV
      })
    } catch (reason) {
      res.status(400).json({
        info: reason
      })
    }
  },

  insert: async (req, res) => {
    try {
      const createTV = await TV.create(req.body)
      res.status(200).json({
        message: "TV successfully added",
        data: createTV
      })
    } catch (reason) {
      res.status(400).json({
        message: reason
      })
    }
  },

  update: async (req, res) => {
    try {
      const updateTV = await TV.update({_id: req.params.id}, {$set: req.body})
      res.status(200).json({
        message: "TV successfully updated",
        data: updateTV
      })
    } catch (reason) {
      res.status(400).json({
        message: reason
      })
    }
  },

  delete: async (req, res) => {
    try {
      const removeTV = await TV.remove({_id: req.params.id})
      res.status(200).json({
        message: "TV successfully deleted",
        data: removeTV
      })
    } catch (reason) {
      res.status(400).json({
        message: reason
      })
    }
  }
}
