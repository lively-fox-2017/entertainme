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

function checkMovieVersion () {
  return new Promise((resolve, reject)=>{
    MovieVersion.find().then((resp) => {
      console.log(resp)
      if (resp.length) {
        resolve()
      } else {
        console.log('sini ga lu')
        MovieVersion.create({version: 0}).then(() => {
          console.log('sini juga ga')
          resolve()
        }).catch(err => {
          reject(err)
          console.error(err)
        })
      }
    })
  })
}

movieSchema.pre('save', function(next){
  checkMovieVersion().then(() => {
    MovieVersion.update({}, {"$inc" : {'version' : 1}}).then(()=>{
      next()
    }).catch(err => {
      console.error(err)
    })
  })
})

movieSchema.pre('findOneAndUpdate', function(next){
  checkMovieVersion().then(() => {
    MovieVersion.update({}, {$inc : {'version' : 1}}).then(()=>{
      next()
    }).catch(err => {
      console.error(err)
    })
  })
})

movieSchema.pre('findOneAndRemove', function(next){
  checkMovieVersion().then(() => {
    MovieVersion.update({}, {$inc : {'version' : 1}}).then(()=>{
      next()
    }).catch(err => {
      console.error(err)
    })
  })
})

var movieVerSchema = new Schema({
  version: {
    type: Number,
    default: 0
  }
})

var Movie = mongoose.model('Movie', movieSchema)
var MovieVersion = mongoose.model('MovieVersion', movieVerSchema)

class Model {
  static async getMovieVer() {
    var movieVer = await MovieVersion.find()
    return {
      status: 'ok',
      data: movieVer[0] ? movieVer[0].version : 0
    }
  }
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
      var movieData = await Movie.findOne({_id:id})
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
      var responseFromMongo = await Movie.findOneAndRemove({_id:id})
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
