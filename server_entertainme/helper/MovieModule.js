const redis = require('redis')
client = redis.createClient(6379)
axios = require('axios')

const  fetchDataMovie = async () => {
  try {
    let promiseMovie = new Promise((resolve,reject) => {
                        client.get('movies', (err,reply) => {
                          if (err) {
                            reject(err)
                          } else {
                            resolve(reply)
                          }
                        })
                      })

    let redisMovie = await promiseMovie
    if (redisMovie) {
      // console.log('data movie from redis\n', redisMovie);
      return JSON.parse(redisMovie)
    } else {
      dataMoviesAPI = await axios.get('http://localhost:3001/movies')
      client.set('movies', JSON.stringify(dataMoviesAPI.data.data), 'EX', 10)
      // console.log('data movie from api', dataMoviesAPI.data.data);
      return dataMoviesAPI.data.data
    }
  } catch (e) {
    console.log(e);
  }
}

module.exports = fetchDataMovie
