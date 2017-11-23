const mongoose = require('mongoose')
const Schema = mongoose.Schema

let TvseriesSchema = new Schema({
  title : String,
  overview: String,
  poster_path: String,
  popularity: String,
  tag: String,
  status: String
})

var Series = mongoose.model('Series', TvseriesSchema)

module.exports = Series
