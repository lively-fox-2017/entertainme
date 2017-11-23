// Require Library
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const axios = require('axios')
const redis = require("redis");
const client = redis.createClient();

const cors = require('cors')

const app = express()

// Use Library
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(morgan('dev'))

const respond = (data) => {
    return JSON.stringify(data)
};

const getUserRepos = (req, res) => {
    console.log('masuk')
    axios.get(`http://localhost:3001/api/movie`)
    .then(dataMovie => {
        axios.get(`http://localhost:3002/api/tvseries`)
        .then(dataTv => {
            let allMovie = {
                Movie: dataMovie.data,
                Tvseries: dataTv.data
            }
            client.setex('semuafilm', 30, respond(allMovie))
            res.send(allMovie)
        })
    })
};

function cache(req, res, next) {
    client.get('semuafilm', function (err, data) {
        if (err) throw err;

        if (data != null) {
            res.send(JSON.parse(data));
        } else {
            next();
        }
    });
}

app.get('/', cache, getUserRepos)


// Original Note (ga kepake)
app.get('/getdatabiasa', function (req, res) {
    // let datamovie = req
    axios.get('http://localhost:3001/api/movie')
    .then((dataMovie) => {
        axios.get('http://localhost:3002/api/tvseries')
        .then((dataTvseries) => {
            let allMovie = {
                Movie: dataMovie.data,
                Tvseries: dataTvseries.data
            }
            res.send(allMovie)
        })
    })

    .catch((err) => {
        res.send(err)
    })
})

// asyncawait series Note (ga kepake)
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