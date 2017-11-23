const fastify = require('fastify')()
const bodyParser = require('body-parser')

fastify.use(bodyParser.json())
fastify.use(bodyParser.urlencoded({ extended: false }))



fastify.listen(3001, () => {
    console.log('Port 3001 for MOVIES !')
})