const dbMovies = require('../models/movies')

const getMovieFromApi = async (req, res) => {
  const data = await dbMovies.find({})
  res.send({
    info: 'movies found successfully',
    data: data
  })
}

const PostMovieToApi = async (req, res) => {
  const data = await dbMovies.create({
    title: req.body.title,
    overview: req.body.overview,
    poster_path: req.body.poster_path,
    popularity: req.body.popularity,
    tag: req.body.tag,
    status: req.body.status
  })
  res.send({
    info: 'successfully created',
    data: data
  })
}

module.exports = {
  getMovieFromApi,
  PostMovieToApi
}
