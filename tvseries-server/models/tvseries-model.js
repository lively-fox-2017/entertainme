const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title:'string',
  overview:'string',
  poster_path: 'string',
  popularity: 'string',
  tag: 'string'
})

const tvseries = mongoose.model('tvseries', schema)
module.exports = tvseries
