const axios = require('axios')
const redis = require('redis')
const client = redis.createClient(6379)


const getApiFromMovieAndTv = async (req, res) => {
  let moviesData = {}
  let seriesData = {}
  client.get(1, async (err, movies) => {
    if (err) console.log(err)
    client.get(2, async (err, series) => {
      if (err) console.log(err)
      if (movies) {
        moviesData = movies
      } else {
        console.log('masuk');
          let movies = await axios.get('http://localhost:3001/movies')
          let fetch = movies.data
          client.set(1, fetch)
          moviesData = fetch.data
      }
      if(series) {
        seriesData = JSON.parse(series)
      } else {
          let series = await axios.get('http://localhost:3002/series')
          let fetchSeries = series.data
          client.set(2, fetchSeries)
          seriesData = fetchSeries.data
      }
      res.send({
        movies: movies,
        series: series
      })
    })
  })
}

const getNewMovieFromApi = async (req, res) => {
  let movie = await axios.get('http://localhost:3001/movies')
  let movieData = JSON.stringify(movie.data)
  client.set(1, movieData)
  res.send({
    info: 'movies found successfully',
    data: movieData
  })
}

const getNewSeriesFromApi = async (req, res) => {
  let series = await axios.get('http://localhost:3002/series')
  let seriesData = JSON.stringify(series.data)
  client.set(2, seriesData)
  res.send({
    info: 'Tv series found successfully',
    data: seriesData
  })
}

module.exports = {
  getApiFromMovieAndTv,
  getNewMovieFromApi,
  getNewSeriesFromApi
}
