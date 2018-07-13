const redis = require('redis')
client = redis.createClient(6379)
axios = require('axios')

const  fetchDataTvSeries = async () => {
  try {
    let promiseTVSeries = new Promise((resolve,reject) => {
                        client.get('tv_series', (err,reply) => {
                          if (err) {
                            reject(err)
                          } else {
                            resolve(reply)
                          }
                        })
                      })

    let redisTVSeries = await promiseTVSeries
    if (redisTVSeries) {
      // console.log('data tv_series from redis\n', redisTVSeries);
      return JSON.parse(redisTVSeries)
    } else {
      dataTvSeriesAPI = await axios.get('http://localhost:3002/tv_series')
      client.set('tv_series', JSON.stringify(dataTvSeriesAPI.data.data), 'EX', 10)
      // console.log('data tv_series from api', dataTvSeriesAPI.data.data);
      return dataTvSeriesAPI.data.data
    }
  } catch (e) {
    console.log(e);
  }
}

module.exports = fetchDataTvSeries
