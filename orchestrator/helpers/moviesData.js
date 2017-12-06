const axios = require('axios')

const moviesAxios = axios.create({
  baseURL: 'http://localhost:3001/movie/'
})

async function movieData () {

  try {
    const data = await moviesAxios.get('get_movie')
    if (data) {
      return data.data
    } else {
      return data
    }
  } catch (e) {
    console.error('Error movie data ', e)
    return e
  }
}

module.exports = movieData
