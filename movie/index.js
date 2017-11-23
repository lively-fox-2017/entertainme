const app = require('fastify')()
const bodyParser = require('fastify-formbody')
const cors = require('cors')
const dotenv = require('dotenv').config()

const movie = require('./routes/MovieRoute')

app.use(cors())
app.register(bodyParser, {}, err => {
  if (err) throw err
})

// app.use('/movie', movie)
app.register(movie, {prefix: '/movie'})

app.listen(process.env.PORT || 3001, () => {
  console.log('Hello from port: 3001')
});
