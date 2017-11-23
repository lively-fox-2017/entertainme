const app = require('express')()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/movie')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const movies = require('./routers/moviesRoute')

app.use('/', movies)

app.listen(3001, () => {
  console.log('run in 3001')
})
