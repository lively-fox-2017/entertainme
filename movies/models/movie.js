var mongoose = require('mongoose')

var Schema = mongoose.Schema

mongoose.connect('mongodb://localhost/entertainme', {
  useMongoClient: true
})

mongoose.Promise = global.Promise

var movieSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  overview: {
    type: String,
    required: true,
  },
  poster_path: {
    type: String,
    required: true
  },
  popularity: {
    type: Number,
    required: true
  },
  tags: [],
  status: {
    type: String,
    required: true
  }
})

var Movie = mongoose.model('Movie', movieSchema)

class Model {
  static model () {
    return Movie
  }
  static async read () {
    try {
      var moviesData = await Movie.find()
      return {
        status: 'ok',
        data: moviesData
      }
    } catch (e) {
      return {
        status: 'failed',
        err: e
      }
    }
  }
  static async readOne (id) {
    try {
      var movieData = await Movie.findOne(id)
      return {
        status: 'ok',
        data: movieData
      }
    } catch (e) {
      return {
        status: 'failed',
        err: e
      }
    }
  }
  static async create (insert) {
    try {
      var responseFromMongo = await Movie.create(insert)
      return {
        status: 'ok',
        data: responseFromMongo
      }
    } catch (e) {
      return {
        status: 'failed',
        err: e
      }
    }
  }
  static async update (id, update) {
    try {
      var responseFromMongo = await Movie.findOneAndUpdate({_id:id}, update, {new:true})
      return {
        status: 'ok',
        data: responseFromMongo
      }
    } catch (e) {
      return {
        status: 'failed',
        err: e
      }
    }
  }
  static async delete (id) {
    try {
      var responseFromMongo = await Movie.findOneAndRemove(id)
      return {
        status: 'ok',
        data: responseFromMongo
      }
    } catch (e) {
      return {
        status: 'failed',
        err: e
      }
    }
  }
}

module.exports = Model
