const express = require('express')
const router = express.Router()
const tvSeries = require('../controllers/tvSeriesControl')

router.get('/series', tvSeries.getTvSeriesFromApi)
router.post('/postseries', tvSeries.postTvSeriesToApi)

module.exports = router
