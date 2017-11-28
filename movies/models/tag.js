var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TagSchema = new Schema({
    text: String,
    date: { type: Date, default: Date.now() }    
})

module.exports = mongoose.model('Tags', TagSchema)