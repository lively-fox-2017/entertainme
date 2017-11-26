const fastify = require('fastify')()
const axios   = require('axios')
// const bodyParser = require('body-parser')

// fastify.use(bodyParser.json())
// fastify.use(bodyParser.urlencoded({ extended: false }))

// fastify parsing
fastify.register(require('fastify-formbody'), {}, (err) => {
    if (err) throw err
    console.log('fastify-formbody running !')
})

const httpMovies = axios.create({
    baseURL: 'http://localhost:3001/movies'
})

const httpTV = axios.create({
    baseURL: 'http://localhost:3002/tv'
})

fastify.get('/tv', async (req,res)=>{
    const {data} = await httpTV.get('')
        res.send(data)
})
fastify.get('/movies', async (req, res) => {
    const { data } = await httpMovies.get('')
    res.send(data)
})



fastify.listen(3000, () => {
    console.log('Port 3000 for ORCHESTRATOR !')
})