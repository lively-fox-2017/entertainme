var app = require('fastify')()
var axios = require('axios');
var cors = require('cors')

var redis = require('redis');
var client = redis.createClient(6379)

app.use(cors())

app.get('/', async (req,res) => {
    var moviesData = {}
    var seriesData = {}
    client.get(1, async (err, movies) => {
        if(err) throw err        
        client.get(2, async (err, series) => {
            if(err) throw err            
            if(movies) {
                moviesData = JSON.parse(movies)
            } else {
                var fetchMovies = await axios.get('http://localhost:3001')
                var string = JSON.stringify(fetchMovies.data)    
                client.set(1, string)
                moviesData = fetchMovies.data
            }
            if(series) {
                seriesData = JSON.parse(series)
            } else {
                var fetchSeries = await axios.get('http://localhost:3002')
                var string = JSON.stringify(fetchSeries.data)    
                client.set(2, string)
                seriesData = fetchSeries.data
            }
            console.log(moviesData)
            console.log(seriesData)
            res.send({
                movies: moviesData,
                series: seriesData
            })
        })
    })
})

app.get('/movieUpdate', async (req,res) => {
    var fetchMovies = await axios.get('http://localhost:3001')
    var string = JSON.stringify(fetchMovies.data)
    client.set(1, string) 
    if(fetchMovies.data) {
        res.send(true)
    }   
})

app.get('/movieSeries', async (req,res) => {
    var fetchSeries = await axios.get('http://localhost:3002')
    var string = JSON.stringify(fetchSeries.data)
    client.set(2, string) 
    if(fetchSeries.data) {
        res.send(true)
    }   
})

app.listen(3000, function(err) {
    if(err) throw err
    console.log(`server is listening on port 3000`)
})