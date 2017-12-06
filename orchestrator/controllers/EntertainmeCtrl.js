const getMoviesData = require('../helpers/getMoviesData')
const getTvsData = require('../helpers/getTvsData')

class EntertainmeCtrl {
  static async getEntertainment (req, res, next) {
    let result = {
      movies: [],
      tvs: []
    }
    try {
      const moviesData = await getMoviesData()
      const tvsData = await getTvsData()
      result.movies = moviesData
      result.tvs = tvsData

      res.code(200).send(result)
    } catch (e) {
      res.code(400).send(e)
    }
  }
}

module.exports = EntertainmeCtrl
