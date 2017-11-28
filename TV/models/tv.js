const mongoose = require("mongoose")
const url = `mongodb://localhost/${process.env.NODE_ENV}`
// const url = "mongodb://terrathe2:terrathe2@ds149495.mlab.com:49495/hacktivoverflow"
mongoose.connection.openUri(url)

const schema = new mongoose.Schema({
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
  popularity: Number,
  tag: Array
})

const tvModel = mongoose.model("TV", schema)

module.exports = tvModel;
