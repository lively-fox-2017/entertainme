const app = require('express')()
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv').config()

const movie = require('./routes/MovieRoute')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use('/movie', movie)

app.listen(process.env.PORT || 3001, () => {
  console.log('Hello from port: 3001')
});
