const redis = require('redis')
const bluebird = require('bluebird')
const axios = require('axios')

bluebird.promisifyAll(redis.RedisClient.prototype)
bluebird.promisifyAll(redis.Multi.prototype)

const client = redis.createClient()
const moviesAxios = axios.create({
  baseURL: 'http://localhost:3001/'
})
const tvAxios = axios.create({
  baseURL: 'http://localhost:3002/'
})

client.on("error", function (err) {
    console.log("Error " + err);
})

class EntertainmeCtrl {
  static getEntertainment (req, res, next) {
    let result = {
      movies: [],
      tvs: []
    }

    Promise.all([client.getAsync('moviesVersion'), client.getAsync('tvsVersion')])
      .then(values => {
        // Check movie version
        if (values[0]) {
          const value = await moviesAxios.get('get_version')
          if (value) {
            // Cache is not up to date
            if (values[0] < value.version) {
              const movies = await moviesAxios.get('get_movie')
              client.set('movies', JSON.stringify(movies))
              client.set('moviesVersion', JSON.stringify(value.version))
              result.movies = movies
            }
            // Cache is up to date
            else {
              const movies = await client.getAsync('movies')
              result.movies = JSON.parse(movies)
            }
          }
          // No version in server
          else {
            const movies = await client.getAsync('movies')
            result.movies = JSON.parse(movies)
          }
        } else {
          const movies = await moviesAxios.get('get_movie')
          client.set('movies', JSON.stringify(movies))
          client.set('moviesVersion', JSON.stringify(value.version))
          result.movies = movies
        }

        // Check tv version
        if (values[1]) {
          const value = await tvsAxios.get('get_version')
          if (value) {
            // Cache is not up to date
            if (values[0] < value.version) {
              const tvs = await tvsAxios.get('get_tv')
              client.set('tvs', JSON.stringify(tvs))
              client.set('tvsVersion', JSON.stringify(value.version))
              result.tvs = tvs
            }
            // Cache is up to date
            else {
              const tvs = await client.getAsync('tvs')
              result.tvs = JSON.parse(tvs)
            }
          }
          // No version in server
          else {
            const tvs = await client.getAsync('tvs')
            result.tvs = JSON.parse(tvs)
          }
        } else {
          const tvs = tvsAxios.get('get_tv')
          client.set('tvs', JSON.stringify(tvs))
          client.set('tvsVersion', JSON.stringify(value.version))
          result.tvs = tvs
        }
      })
  }
}

module.exports = EntertainmeCtrl
