const mongoose = require('mongoose')
const Schema = mongoose.Schema

let MoviesSchema = new Schema({
  title : String,
  overview: String,
  poster_path: String,
  popularity: String,
  tag: String,
  status: String
})

var Movies = mongoose.model('Movies', MoviesSchema)

module.exports = Movies
