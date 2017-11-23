const express = require('express')
const router = express.Router()
const tvSeries = require('../controllers/entertaimentControl')

router.get('/entertaiment', tvSeries.getApiFromMovieAndTv)
router.get('/newmovie', tvSeries.getNewMovieFromApi)
router.get('/newseries', tvSeries.getNewSeriesFromApi)

module.exports = router
