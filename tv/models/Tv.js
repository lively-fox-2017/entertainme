const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.Promise = global.Promise
mongoose.connection.openUri(`${process.env.MONGOURI}`)

let TvSchema = new Schema({
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

TvSchema.pre('update', function(next) {
  this.updateOne({
      _id: this._conditions._id
    }, {
      updatedAt: Date.now()
    })
    .then(() => {
      next();
    })
    .catch(reason => {
      console.log(reason)
    });
})


module.exports = mongoose.model('Tv', TvSchema)
