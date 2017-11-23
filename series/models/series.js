var mongoose = require('mongoose');
var Tag = require('./tag')
var Schema = mongoose.Schema;

var SeriesSchema = new Schema({
    poster_path : String,    
    popularity: Number,
    overview: String,
    name: String,
    tag: { type: Schema.Types.ObjectId, ref: 'Tags' },
    date: { type: Date, default: Date.now() }
})

module.exports = mongoose.model('Series', SeriesSchema)