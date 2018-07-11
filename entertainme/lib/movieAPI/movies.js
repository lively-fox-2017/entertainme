const axios = require('axios')

async function getMovies() {
  try {
    var {data} = await axios.get('http://localhost:3001/api/movies')
    return data
  } catch (e) {
    return e
  }
}

async function getMovieVer () {
  try {
    var {data} = await axios.get('http://localhost:3001/api/movies/version')
    return data
  } catch (e) {
    return e
  }
}

module.exports = {
  getMovies,
  getMovieVer
}
