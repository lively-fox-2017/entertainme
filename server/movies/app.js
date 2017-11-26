const fastify    = require('fastify')()
const mongoose   = require('mongoose')
const cors       = require('cors')
// const bodyParser = require('body-parser')

//mongo
const uri = 'mongodb://localhost/entertaint-movie'
mongoose.connect(uri, (err) => {
    if (!err) { console.log('MOVIES CONNECTED MONGOOSE') }
    else { console.log('MOVIES NOT CONNECTED MONGOOSE') }
})
//use cors
fastify.use(cors())

// fastify parsing
fastify.register(require('fastify-formbody'), {}, (err) => {
    if (err) throw err
    console.log('fastify-formbody running !')
})

//route
const movies = require('./routes/movies');

//use route
fastify.register(movies, { prefix:'/movies' })

// fastify.use(bodyParser.json())
// fastify.use(bodyParser.urlencoded({ extended: false }))


fastify.listen(3001, () => {
    console.log('Port 3001 for MOVIES !')
})