const redis = require('redis')
const bluebird = require('bluebird')

bluebird.promisifyAll(redis.RedisClient.prototype)
bluebird.promisifyAll(redis.Multi.prototype)

const tvsData = require('./tvsData')
const tvsVersion = require('./tvsVersion')

const client = redis.createClient()

client.on("error", function (err) {
    console.log("Error " + err);
})

module.exports = function () {
  return new Promise((resolve, reject) => {
    client.getAsync('tvsVersion')
     .then(async function (versionCache) {
       const versionAPI = await tvsVersion()
       if (parseInt(versionCache) >= versionAPI) {
         client.getAsync('tvs')
          .then(tvsCache => {
            resolve(tvsCache)
          })
          .catch(reason => {
            console.error(reason)
            reject(reason)
          })
       } else {
         //  const tvsAPI = 'asdasd'
         const tvsAPI = await tvsData()
         resolve(tvsAPI)
       }
     })
     .catch(reason => {
       console.error(reason)
       reject(reason)
     })
  })
}
