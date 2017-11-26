const fastify    = require('fastify')()
const mongoose   = require('mongoose')
const cors       = require('cors')

//mongo
const uri = 'mongodb://localhost/entertaint-tv'
mongoose.connect(uri, (err)=>{
    if(!err) {console.log('TV CONNECTED MONGOOSE')}
    else { console.log('TV NOT CONNECTED MONGOOSE')}
})

// fastify parsing
fastify.register(require('fastify-formbody'), {}, (err) => {
    if (err) throw err
    console.log('fastify-formbody running !')
})

//route
const tv = require('./routes/tv');

//use cors
fastify.use(cors())

// use route
// fastify.use('/tv', tv)
fastify.register(tv, { prefix: '/tv' })

fastify.listen(3002, (err) =>{
    if (err) throw err
    console.log('Port 3002 for TV !')
})
