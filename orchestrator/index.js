const app = require('fastify')()
const bodyParser = require('fastify-formbody')
const cors = require('cors')
const { graphqlFastify, graphiqlFastify } = require('fastify-apollo')

const entertainme = require('./routes/entertainmeRoute')
const appSchema = require('./helpers/graphqlSchema')

app.use(cors())

app.register(bodyParser, {}, err => {
  if (err) throw err
})
app
  .register(graphqlFastify, {
    schema: appSchema,
    printSchema: true
  })
  .register(graphiqlFastify, {
    endpointURL: '/',
    prefix: '/graphiql'
  })

app.register(entertainme, {prefix: '/entertainme'})

app.listen(process.env.PORT || 3000, () => {
  console.log('Hello from port: 3000')
});
