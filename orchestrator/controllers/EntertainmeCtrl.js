const redis = require('redis')
const bluebird = require('bluebird')

bluebird.promisifyAll(redis.RedisClient.prototype)
bluebird.promisifyAll(redis.Multi.prototype)

const client = redis.createClient()

client.on("error", function (err) {
    console.log("Error " + err);
})

class EntertainmeCtrl {
  static getEntertainment (req, res, next) {
    let result = {
      movies: [],
      series: []
    }

    Promise.all([client.getAsync('movies'), client.getAsync('series')])
  }
}

module.exports = EntertainmeCtrl
