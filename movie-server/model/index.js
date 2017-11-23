'use strict'

const mongoose = require('mongoose');

mongoose.connect(process.env.DB_HOST, { useMongoClient: true });
mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

const movieSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  overview: {
    type: String,
    required: true
  },
  poster_path: {
    type: String,
    required: true
  },
  popularity: {
    type: Number,
    required: true
  },
  tag: {
    type: [String]
  }
},
{
  timestamps: true
});

module.exports = mongoose.model('Movie', movieSchema);