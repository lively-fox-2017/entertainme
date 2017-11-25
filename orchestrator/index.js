const app = require('fastify')()
const bodyParser = require('fastify-formbody')
const cors = require('cors')

const entertainme = require('./routes/entertainmeRoute');

app.use(cors())

app.register(bodyParser, {}, err => {
  if (err) throw err
})

app.register(entertainme, {prefix: '/entertainme'})

app.listen(process.env.PORT || 3000, () => {
  console.log('Hello from port: 3000')
});
