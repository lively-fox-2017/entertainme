const app = require('fastify')()
const bodyParser = require('fastify-formbody')
const cors = require('cors')
const dotenv = require('dotenv').config()

const tv = require('./routes/TvRoute')

app.use(cors())
app.register(bodyParser, {}, err => {
  if (err) throw err
})

app.register(tv, {prefix: '/tv'})

app.listen(process.env.PORT || 3002, () => {
  console.log('Hello from port: 3002')
});
