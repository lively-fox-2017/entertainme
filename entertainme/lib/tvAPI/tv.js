const axios = require('axios')

async function getTvSeries() {
  try {
    var {data} = await axios.get('http://localhost:3002/api/tv')
    return data
  } catch (e) {
    return e
  }
}

module.exports = {
  getTvSeries
}
