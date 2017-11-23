// Require Library
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

const mongoose = require('mongoose')
const app = express()

// Use Library
app.use(cors())
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
let tvseries = require('./routers/tvseries-router.js')

app.use('/api/tvseries',tvseries)

// Listen
app.listen(process.env.PORT || 3002, function(){
  console.log('listen 3002');
})
