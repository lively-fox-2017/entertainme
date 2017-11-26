const fastify = require('fastify')()
const cors    = require('cors')
const axios   = require('axios')
const redis   = require('redis'),
client  = redis.createClient(6379)

// fastify.use(bodyParser.json())
// fastify.use(bodyParser.urlencoded({ extended: false }))

// fastify parsing
fastify.register(require('fastify-formbody'), {}, (err) => {
    if (err) throw err
    console.log('fastify-formbody running !')
})

fastify.use(cors())

const httpMovies = axios.create({
    baseURL: 'http://localhost:3001/movies'
})

const httpTV = axios.create({
    baseURL: 'http://localhost:3002/tv'
})

fastify.get('/tv', async (req,res)=>{
    // console.log('halooooooooooooooooooooooo');
    try {
        const {data} = await httpTV.get('')
        client.set('tv', JSON.stringify(data))
        if (data) res.send(data)
        res.send(false)
            // res.send(data)
    } catch (err) {
            console.log(err)
            res.send(err)
    }
})

fastify.get('/movies', async (req, res) => {
    try {
        const { data } = await httpMovies.get('')
        client.set('movies', JSON.stringify(data))
        if (data) res.send(data)
        res.send(false)
    } catch (err) {
        console.log(err)
        res.send(err)
    }
})

fastify.get('/', async (req,res) => {
    let moviesData, tvData

    client.get('tv', async (err,resultTv) =>{
        if (err) res.send(err)
        if (resultTv) {
            console.log('from redis client.tv',resultTv)
            tvData = resultTv
        } else {
            const fetchTvData = await httpTV.get('')
            console.log('fetchTvData.data')
            tvData = JSON.stringify(fetchTvData.data)
        }
        client.get('movies', async (err,resultMovies) =>{
            if (err) res.send(err)
            if (resultMovies) {
                console.log('from redis client.movies', resultMovies)
                moviesData = resultMovies
            } else {
                const fetchMoviesData = await httpMovies.get('')
                console.log('fetchMoviesData.data')
                moviesData = JSON.stringify(fetchMoviesData.data)
            }
            res.send({
                tvOrchestrator: tvData,
                moviesOrchestrator: moviesData
            })

        })
    })
 
    // try {
    //     const resultTv = await client.get('tv')
    //     console.log('from redis client.tv', resultTv)
    //     if (resultTv.length) {
    //         tvData = resultTv
    //     } else {
    //         const fetchTvData = await httpTV.get('')
    //         console.log('fetchTvData.data', fetchTvData.data)
    //         tvData = JSON.stringify(fetchTvData.data)
    //     }
    //     try {
    //         const resultMovies = await client.get('movies')
    //         console.log('from redis client.movies', resultMovies)
    //         if (resultMovies.length) {
    //             moviesData = resultMovies
    //         } else {
    //             const fetchMoviesData = await httpMovies.get('')
    //             console.log('fetchMoviesData.data', fetchMoviesData.data)
    //             moviesData = JSON.stringify(fetchMoviesData.data)
    //         }
    //         res.send({
    //             tvOrchestrator: tvData,
    //             moviesOrchestrator: moviesData
    //         })
    //     } catch (err) {
    //         console.error(err)
    //         throw err
    //     }
    // } catch (err) {
    //     console.error(err)
    //     throw err
    // }
})


fastify.listen(3000, () => {
    console.log('Port 3000 for ORCHESTRATOR !')
})

// const tvfetch = () =>{
    //     return new Promise (async(resolve,reject)=>{
    //         try {
    //             const {data} = await httpTV.get('')
    //             if (data) resolve(data)
    //             return
    //         } catch (err){
    //             reject(err)
    //         }
    //     })
    // }
    // const moviesfetch = () =>{
    //     return new Promise( async(resolve,reject)=>{
    //         try {
    //             const {data} = await  httpMovies.get('')
    //             if (data) resolve(data)
    //             return
    //         } catch (err) {
    //             reject(err)
    //         }
    //     })
    // }