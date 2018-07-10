const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/dbtv')
let Schema = mongoose.Schema, ObjectId = Schema.ObjectId
var tvSchema = new mongoose.Schema({
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
  
  var Tv = mongoose.model('Tv', tvSchema)
  
  module.exports = Tv;