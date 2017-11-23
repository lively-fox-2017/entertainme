const express = require('express')
const router = express.Router()
const Movie = require('../controllers/movieControl')

router.get('/movies', Movie.getMovieFromApi)
router.post('/postmovie', Movie.PostMovieToApi)

module.exports = router
