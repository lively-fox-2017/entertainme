const redis = require('redis')
const axios = require('axios')

const tvsAxios = axios.create({
  baseURL: 'http://localhost:3002/tv/'
})

module.exports = async function () {
  try {
    const data = await tvsAxios('get_tv')
    if (data) {
      return data.data
    } else {
      return data
    }
  } catch (e) {
    console.error('Error tv data ', e)
    return e
  }
}
