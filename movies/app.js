const app = require('express')()
const bodyParser = require('body-parser')
const cors = require('cors')
const movies = require('./routers/movies')

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use('/api/movies', movies)

app.listen(3001, () => {
  console.log('Movies Endpoint listening on port 30001')
})
