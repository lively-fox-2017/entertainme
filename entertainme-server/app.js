// Require Library
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const axios = require('axios')

const app = express()

// Use Library
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(morgan('dev'))

app.get('/', function (req, res) {
    axios.get('http://localhost:3001/api/movie')
    .then((dataMovie) => {
        axios.get('http://localhost:3002/api/tvseries')
        .then((dataTvseries) => {
            res.send({
                Movie: dataMovie.data,
                Tvseries: dataTvseries.data
            })
        })
    })

    .catch((err) => {
        res.send(err)
    })
})

// asyncawait series
app.get('/aa', function (req, res) {
    const getMovie = () => axios.get('http://localhost:3001/api/movie')
    const getTV = () => axios.get('http://localhost:3002/api/tvseries')

    const getDataSemua = async () => {
        try {
            const Movie = await getMovie()
            const Tvseries = await getTV()

            res.send({
                Movie: Movie.data,
                Tvseries: Tvseries.data
            })
        }
        catch (err) {
            res.send(err)
        }
    }

    getDataSemua()

})

app.listen(process.env.PORT || 3000, function(){
    console.log('listen 3000');
  })