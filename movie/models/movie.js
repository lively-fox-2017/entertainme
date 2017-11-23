const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/dbmovie')
let Schema = mongoose.Schema, ObjectId = Schema.ObjectId
var movieSchema = new mongoose.Schema({
    title : {
      type : String
    },
    overview : {
      type : String
    },
    poster_path : {
      type : String
    },
    popularity: {
      type: Number
    },
    status: {
      type: String
    },
    tag: []
  })
  
  var Movie = mongoose.model('Movie',movieSchema)
  
  module.exports = Movie;