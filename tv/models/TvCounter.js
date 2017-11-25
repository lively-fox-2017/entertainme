const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.Promise = global.Promise
mongoose.connection.openUri(`${process.env.MONGOURI}`);

let TvCounterSchema = new Schema({
  name: String,
  version: {
    type: Number,
    default: 0
  }
})

module.exports = mongoose.model('TvCounter', TvCounterSchema);
