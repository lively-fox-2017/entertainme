const fastify = require('fastify')()
const bodyParser = require('body-parser')

fastify.use(bodyParser.json())
fastify.use(bodyParser.urlencoded({ extended: false }))


fastify.listen(3000, () => {
    console.log('Port 3001 for ENTERTAINT !')
})