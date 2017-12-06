const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.Promise = global.Promise
mongoose.connection.openUri(`${process.env.MONGOURI}`)
const MovieCounter = require('./MovieCounter');

let movieSchema = new Schema({
  poster_path: String,
  overview: String,
  title: {
    type: String,
    required: true
  },
  popularity: Number,
  tag: [{
    type: String
  }],
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: null
  }
})

movieSchema.pre('save', function(next) {
  MovieCounter
    .findOneAndUpdate({
      name: 'movie'
    }, {
      name: 'movie',
      $inc: {version: 1}
    }, {
      new: true,
      upsert: true
    })
    .then(version => {
      next()
    })
    .catch(reason => {
      console.error(reason)
      next(reason)
    })
})

movieSchema.pre('findOneAndUpdate', function(next) {
  this.updateOne({
      _id: this._conditions._id
    }, {
      updatedAt: Date.now()
    })
    .then(() => {
      MovieCounter
        .findOneAndUpdate({
          name: 'movie'
        }, {
          name: 'movie',
          $inc: {version: 1}
        }, {
          new: true,
          upsert: true
        })
        .then(version => {
          next()
        })
    })
    .catch(reason => {
      console.error(reason)
      next(reason)
    })
})

movieSchema.pre('findOneAndRemove', function(next) {
  MovieCounter
    .findOneAndUpdate({
      name: 'movie'
    }, {
      name: 'movie',
      $inc: {version: 1}
    }, {
      new: true,
      upsert: true
    })
    .then(version => {
      next()
    })
})


module.exports = mongoose.model('Movie', movieSchema)
