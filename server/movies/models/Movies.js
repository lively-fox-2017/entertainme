const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const movieSchema = new Schema({
    title: { type: String, required: true},
    overview: String,
    poster_path: String,
    popularity: String,
    tag: [],
    status: String
},
{ timestamps: true}
)

const movie = mongoose.model('transaction', movieSchema);

module.exports = movie
