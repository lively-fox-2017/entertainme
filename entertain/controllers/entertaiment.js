const redis = require("redis")
const client = redis.createClient(6379)
const axios = require('axios')

const getEntertain = async (req,res) => {
  moviesData = {}
  tvData = {}
  client.get(1, async(err, movies) => {
    if(err) console.error(err)
    client.get(2, async(err, tv) => {      
      if(err) console.error(err)
      if(movies) {
        moviesData = movies
      } else {
        let movies = await axios.get('http://localhost:3001/movie')
        let fetch = JSON.stringify(movies.data)
        client.set(1, fetch)
        moviesData = fetch
      }
      if(tv) {
        tvData = tv
      } else {
        let tv = await axios.get('http://localhost:3002/tv')
        let fetchtv = JSON.stringify(tv.data)
        client.set(2, fetchtv)
        tvData = fetchtv
      }
      res.send({
        movies: movies,
        tv: tv
      })
    })
  })    
}

const getMovie = async (req,res) => {
  moviesData = {}
  client.get(1, async(err, movies) => {
    if(err) console.error(err)
    if(movies) {
      moviesData = movies
    } else {
      let movies = await axios.get('http://localhost:3001/movie')
      let fetch = JSON.stringify(movies.data)
      client.set(1, fetch)
      moviesData = fetch
    }
    res.send({
      movies: movies
    })
  })  
}
const getTv = async (req, res) => {
  tvData = {}
  client.get(1, async(err, tv) => {
    if(err) console.error(err)
    if(tv) {
      tvData = tv
    } else {
      let tv = await axios.get('http://localhost:3002/tv')
      let fetchtv = JSON.stringify(tv.data)
      client.set(1, fetchtv)
      tvData = fetchtv
    }
    res.send({
      tv: tv
    })
  })  
}
module.exports = {
  getEntertain,
  getMovie,
  getTv
}