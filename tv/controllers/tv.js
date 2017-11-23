const model = require('../models/tv')
class Tv{
  static getAll(req, res) {
      model.find()
      .then(data => {
        res.send(data)
      })
      .catch(err => {
        res.error({err: err})
      })
  }
  static getBy(req, res) {
    model.findOne({_id: req.params.id})
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.error({err: err})
    })
  }
  static add(req, res) {
    model.create(req.body)
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.send(err)
    })
  }
  static edit(req, res) {
    model.update({ _id: req.params.id }, req.body)
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.send(err)
    })
  }
  static delete(req, res) {
    model.deleteOne({_id: req.params.id})
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.error({err: err})
    })
  }
}
module.exports = Tv