const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
// const redis = require("redis"), client = redis.createClient()
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(cors())
let tv = require('./routes/tv')
app.use('/tv', tv)

app.listen(3002, function (err) {
 if (err) throw err
 console.log(`server listening on 3002`)
})