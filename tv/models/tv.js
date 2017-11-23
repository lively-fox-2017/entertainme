var mongoose = require('mongoose')

var Schema = mongoose.Schema

mongoose.connect('mongodb://localhost/entertainme', {
  useMongoClient: true
})

mongoose.Promise = global.Promise

var tvSchema = new Schema({
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

var Tv = mongoose.model('Tv', tvSchema)

class Model {
  static model () {
    return Tv
  }
  static async read () {
    try {
      var tvSeriesData = await Tv.find()
      return {
        status: 'ok',
        data: tvSeriesData
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
      var tvSeriesData = await Tv.findOne(id)
      return {
        status: 'ok',
        data: tvSeriesData
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
      var responseFromMongo = await Tv.create(insert)
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
      var responseFromMongo = await Tv.findOneAndUpdate({_id:id}, update, {new:true})
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
      var responseFromMongo = await Tv.findOneAndRemove(id)
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
