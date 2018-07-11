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

var tvVerSchema = new Schema({
  version: {
    type: Number,
    default: 0
  }
})

function checkTvVersion () {
  return new Promise((resolve, reject)=>{
    TvVersion.find().then((resp) => {
      console.log(resp)
      if (resp.length) {
        resolve()
      } else {
        TvVersion.create({version: 0}).then(() => {
          resolve()
        }).catch(err => {
          reject(err)
          console.error(err)
        })
      }
    })
  })
}

tvSchema.pre('save', function(next){
  checkTvVersion().then(() => {
    TvVersion.update({}, {"$inc" : {'version' : 1}}).then(()=>{
      next()
    }).catch(err => {
      console.error(err)
    })
  })
})

tvSchema.pre('findOneAndUpdate', function(next){
  checkTvVersion().then(() => {
    TvVersion.update({}, {$inc : {'version' : 1}}).then(()=>{
      next()
    }).catch(err => {
      console.error(err)
    })
  })
})

tvSchema.pre('findOneAndRemove', function(next){
  checkTvVersion().then(() => {
    TvVersion.update({}, {$inc : {'version' : 1}}).then(()=>{
      next()
    }).catch(err => {
      console.error(err)
    })
  })
})

var Tv = mongoose.model('Tv', tvSchema)
var TvVersion = mongoose.model('TvVersion', tvVerSchema)

class Model {
  static async getTvVer() {
    var tvVer = await TvVersion.find()
    return {
      status: 'ok',
      data: tvVer[0] ? tvVer[0].version : 0
    }
  }
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
      var tvSeriesData = await Tv.findOne({_id:id})
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
      var responseFromMongo = await Tv.findOneAndRemove({_id:id})
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
