const app = require('express')()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

const entertaiment = require('./routers/entertaimentRoute')

app.use('/', entertaiment)

app.listen(3000, () => {
  console.log('run in 3000')
})
