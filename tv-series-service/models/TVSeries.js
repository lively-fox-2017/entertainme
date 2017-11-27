require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connection.openUri(process.env.MONGO_URL);

const Schema = mongoose.Schema;

const TVSeriesSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required']
  },
  overview: {
    type: String
  },
  poster_path: {
    type: String
  },
  popularity: {
    type: Number
  },
  tag: {
    type: Array
  },
  status: {
    type: String
  }
});

module.exports = mongoose.model('TVSeries', TVSeriesSchema);
