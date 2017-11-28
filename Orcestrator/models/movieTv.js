const axios = require('axios')

class MovieTV {
  static async axiosGet() {
    try {
      const movie = await axios.get('http://localhost:3001/movies')
      const TV = await axios.get('http://localhost:3002/tv')
      // console.log(JSON.stringify(movie.data));

      return JSON.stringify({movies: movie.data, series: TV.data})
    } catch (reason) {
      return reason
    }
  }
}

module.exports = MovieTV
