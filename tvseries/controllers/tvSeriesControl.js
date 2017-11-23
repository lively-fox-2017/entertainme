const dbSeries = require('../models/tvSeries')

const getTvSeriesFromApi = async (req, res) => {
  let data = await dbSeries.find({})
  res.send({
    info: 'tv series successfully found',
    data: data
  })
}

const postTvSeriesToApi = async (req, res) => {
  let data = await dbSeries.create({
    title: req.body.title,
    overview: req.body.overview,
    poster_path: req.body.poster_path,
    popularity: req.body.popularity,
    tag: req.body.tag,
    status: req.body.status
  })
  res.send({
    info: 'tv series successfully created',
    data: data
  })
}

module.exports = {
  getTvSeriesFromApi,
  postTvSeriesToApi
}
