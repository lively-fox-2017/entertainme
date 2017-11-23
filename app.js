const app = require('express')()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const redis = require('redis')
const client = redis.createClient()
mongoose.connect('mongodb://localhost/movieentertainment')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const movies = require('./routers/moviesRoute')
const tvSeries = require('./routers/tvSeriesRoute')

app.use('/', movies)
app.use('/', tvSeries)

app.listen(3000, () => {
  console.log('run in 3000')
})
