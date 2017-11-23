const Tv = require('../models/tv')

class TvCtrl {
  static async version (req, res) {
    var response = await Tv.getTvVer()
    res.send(response)
  }
  static async read (req, res) {
    var response = await Tv.read()
    res.send(response)
  }
  static async readOne (req, res) {
    var response = await Tv.readOne(req.params.id)
    res.send(response)
  }
  static async create (req, res) {
    var response = await Tv.create(req.body)
    res.send(response)
  }
  static async update (req, res) {
    var response = await Tv.update(req.params.id, req.body)
    res.send(response)
  }
  static async delete (req, res) {
    var response = await Tv.delete(req.params.id)
    res.send(response)
  }
}

module.exports = TvCtrl
