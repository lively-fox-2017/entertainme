const graphQLHTTP = require('express-graphql')
const redis = require('redis')
const client = redis.createClient()

const movieTV = require('../models/movieTv')
const appSchema = require('../models/AppSchema')

function checkCache() {
  return new Promise((resolve, reject) => {
    client.get('movieTV', (err, reply) => {
      if (err) {
        reject(err)
      } else {
        resolve(reply)
      }
    })
  })
}

module.exports = {
  fetchAll: async (req, res) => {
    try {
      const check = await checkCache()
      // console.log(check, '===-=-');
      if (check) {
        res.status(200).json({
          message: "Berhasil Tampil Fetch Data dari REDIS",
          data: JSON.parse(check)
        })
      } else {
        const MovieTV = await movieTV.axiosGet();
        // console.log(JSON.parse(MovieTV));

        client.set('movieTV', MovieTV)
        client.expire('movieTV', 10)

        res.status(200).json({
          message: "Berhasil Tampil Fetch Data dari API",
          data: JSON.parse(MovieTV)
        })
      }
    } catch (reason) {
      res.status(400).json({
        message: reason
      })
    }
  },

  graphQL: () => graphQLHTTP({
    schema: appSchema,
    graphiql: true,
  })
}
