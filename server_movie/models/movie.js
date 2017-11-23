const mongoose = require('mongoose')
mongoose.connection.openUri(`${process.env.app_db_movie}`, (err) => {
  if (err) {
    console.log(err);
  }
})

const Schema = mongoose.Schema;

const moviesSchema = new Schema({
  poster_path : String,
  overview : String,
  title : String,
  popularity : String,
  tag : [String]
})

module.exports = mongoose.model('Movies', moviesSchema);
