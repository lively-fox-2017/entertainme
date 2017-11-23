const app = require('express')()
const bodyParser = require('body-parser')
const cors = require('cors')
const tv = require('./routers/tv')

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use('/api/tv', tv)

app.listen(3002, () => {
  console.log('TV Endpoint listening on port 3002')
})
