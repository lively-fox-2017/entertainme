var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/entertainme');
var Schema = mongoose.Schema;

var movieSchema = new Schema({
  title:  String,
  overview: String ,
  poster_path: String ,
  popularity: Number ,
  tag:[{type: String}],
  status: String
});

var Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
