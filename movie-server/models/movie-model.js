const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title:'string',
  overview:'string',
  poster_path: 'string',
  popularity: 'string',
  tag: 'string'
})

const movies = mongoose.model('movies', schema)
module.exports = movies
