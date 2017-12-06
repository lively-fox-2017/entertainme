const axios = require('axios')

const moviesAxios = axios.create({
  baseURL: 'http://localhost:3001/movie/'
})

async function movieVersion () {
  try {
    const data = await moviesAxios.get('get_version')
    if (data) {
      return data.data
    } else {
      return data
    }
  } catch (e) {
    console.error('Error movie version ', e)
    return e
  }
}

module.exports = movieVersion
