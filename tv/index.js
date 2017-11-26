const app = require('express')()
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv').config()

const tv = require('./routes/TvRoute')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use('/tv', tv)

app.listen(process.env.PORT || 3002, () => {
  console.log('Hello from port: 3002')
})
