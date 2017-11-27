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
            resolve({source: 'redis', tvs: JSON.parse(tvsCache)})
          })
          .catch(reason => {
            console.error(reason)
            reject(reason)
          })
       } else {
         const tvsAPI = await tvsData()
         client.set('tvsVersion', versionAPI)
         client.set('tvs', JSON.stringify(tvsAPI))
         resolve({source: 'API', tvs: tvsAPI})
       }
     })
     .catch(reason => {
       console.error(reason)
       reject(reason)
     })
  })
}
