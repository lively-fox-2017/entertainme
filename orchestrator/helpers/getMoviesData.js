const redis = require('redis')
const bluebird = require('bluebird')

bluebird.promisifyAll(redis.RedisClient.prototype)
bluebird.promisifyAll(redis.Multi.prototype)

const moviesData = require('./moviesData')
const moviesVersion = require('./moviesVersion')

const client = redis.createClient()

client.on("error", function (err) {
    console.log("Error " + err);
})

module.exports = function () {
  return new Promise((resolve, reject) => {
    client.getAsync('moviesVersion')
     .then(async function (versionCache) {
       const versionAPI = await moviesVersion()
       if (parseInt(versionCache) >= versionAPI) {
         client.getAsync('movies')
          .then(moviesCache => {
            resolve(moviesCache)
          })
          .catch(reason => {
            console.error(reason)
            reject(reason)
          })
       } else {
         const moviesAPI = await moviesData()
         resolve(moviesAPI)
       }
     })
     .catch(reason => {
       console.error(reason)
       reject(reason)
     })
  })
}
