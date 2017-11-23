const axios = require('axios')

const getMovie = () => axios.get('http://localhost:3001/movies')
const getTvSeries = () => axios.get('http://localhost:3002/series')

const getApiFromMovieAndTv = async (req, res) => {
  try {
    const movie = await getMovie()
    const tvSeries = await getTvSeries()

    res.send({
      movie: movie.data,
      tvSeries: tvSeries.data
    })
  } catch (err) {
    console.error(err)
  }
}

module.exports = {
  getApiFromMovieAndTv
}
