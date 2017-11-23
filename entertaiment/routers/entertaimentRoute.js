const express = require('express')
const router = express.Router()
const tvSeries = require('../controllers/entertaimentControl')

router.get('/entertaiment', tvSeries.getApiFromMovieAndTv)

module.exports = router
