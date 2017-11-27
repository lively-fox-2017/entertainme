const axios = require('axios')

const tvsAxios = axios.create({
  baseURL: 'http://localhost:3002/tv/'
})

module.exports = async function () {
  try {
    const data = await tvsAxios.get('get_version')
    if (data) {
      return data.data
    } else {
      return data
    }
  } catch (e) {
    console.error('Error tv version ', e)
    return e
  }
}
