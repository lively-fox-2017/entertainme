var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/entertainme');
var Schema = mongoose.Schema;

var tvSchema = new Schema({
  title:  String,
  overview: String ,
  poster_path: String ,
  popularity: Number ,
  tag:[{type: String}],
  status: String
});

var TV = mongoose.model('TV', tvSchema);

module.exports = TV;
