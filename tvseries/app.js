const app = require('express')()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/tvseries')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const tvSeries = require('./routers/tvSeriesRoute')

app.use('/', tvSeries)

app.listen(3002, () => {
  console.log('run in 3002')
})
