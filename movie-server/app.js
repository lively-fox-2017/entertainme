// Require Library
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const mongoose = require('mongoose')
const app = express()

// Use Library
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(morgan('dev'))

// Mongodb
var MongoClient = require('mongodb').MongoClient;
var uri = 'mongodb://Indraprahastha:Pancasila85@ds119355.mlab.com:19355/tester-database';
mongoose.connect(uri, err => {
  if(err) {
    console.log('errrorrrrr=====>',err);
  }
  else {
  }
});
var db = mongoose.connection;

// Api
let movie = require('./routers/movie-router.js')

app.use('/api/movie',movie)

// Listen
app.listen(process.env.PORT || 3001, function(){
})
