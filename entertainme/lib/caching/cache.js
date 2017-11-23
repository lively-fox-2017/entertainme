const redis = require('redis')
var client = redis.createClient()

const Movies = require('../movieAPI/movies')
const Tv = require('../tvAPI/tv')

function getMovieVer() {
  return new Promise((resolve, reject)=>{
    client.get("versionMovies", async function(err, res) {
      if(err) {
        console.error('redis error', err)
        reject(err)
      } else {
        var movieVer = await Movies.getMovieVer()
        if (parseInt(res) === parseInt(movieVer.data)) {
          resolve(true)
        } else {
          client.set("versionMovies", JSON.stringify(movieVer.data))
          resolve(false)
        }
      }
    })
  })
}

async function getMoviesData () {
  var data = await getMovieVer()
  if (data) {
    var movieDataFromRedis = new Promise((resolve, reject) => {
        client.get("movies", function (err, res) {
        if (err) {
          console.error('redis error', err)
          reject(err)
        } else {
          resolve(JSON.parse(res))
        }
      })
    })
    var redisData = await movieDataFromRedis.then((res) => {
      return res
    })
    return redisData
  } else {
    var moviesData = await Movies.getMovies()
    client.set("movies", JSON.stringify(moviesData.data))
    return moviesData.data
  }
}

function getTvVer() {
  return new Promise ((resolve, reject) => {
    client.get("versionTv", async function(err, res) {
      if(err) {
        console.error('redis error', err)
        return {
          status: 'failed',
        }
      } else {
        var tvVer = await Tv.getTvVer()
        if (parseInt(res) === parseInt(tvVer.data)) {
          resolve(true)
        } else {
          client.set("versionTv", JSON.stringify(tvVer.data))
          resolve(false)
        }
      }
    })
  })
}

async function getTvData () {
  var data = await getTvVer()
  if (data) {
    var tvDataFromRedis = new Promise((resolve, reject) => {
        client.get("tv", function (err, res) {
        if (err) {
          console.error('redis error', err)
          reject(err)
        } else {
          resolve(JSON.parse(res))
        }
      })
    })
    var redisData = await tvDataFromRedis.then((res) => {
      return res
    })
    return redisData
  } else {
    var tvData = await Tv.getTvSeries()
    client.set("tv", JSON.stringify(tvData))

    return tvData
  }
}

module.exports = {
  getMovieVer,
  getMoviesData,
  getTvVer,
  getTvData
}
