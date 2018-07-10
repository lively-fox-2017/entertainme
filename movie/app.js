const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
// const redis = require("redis"), client = redis.createClient()
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(cors())
let movie = require('./routes/movie')
app.use('/movie', movie)

app.listen(3001, function (err) {
 if (err) throw err
 console.log(`server listening on 3001`)
})