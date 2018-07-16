const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const tvSchema = new Schema({
    title: { type: String, required: true},
    overview: String,
    poster_path: String,
    popularity: String,
    tag: [],
    status: String
},
{ timestamps: true}
)

const tv = mongoose.model('transaction', tvSchema);

module.exports = tv
