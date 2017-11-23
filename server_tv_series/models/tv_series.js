const mongoose = require('mongoose')
mongoose.connection.openUri(`${process.env.app_db_tv_series}`, (err) => {
  if (err) {
    console.log(err);
  }
})

const Schema = mongoose.Schema;

const tvSeriesSchema = new Schema({
  poster_path : String,
  overview : String,
  title : String,
  popularity : String,
  tag : [String]
})

module.exports = mongoose.model('TvSeries', tvSeriesSchema);
