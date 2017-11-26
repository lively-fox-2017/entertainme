const express = require('express')
const router = express.Router()

const MovieCtrl = require('../controllers/MovieCtrl')
const MovieCounterCtrl = require('../controllers/MovieCounterCtrl')

router.post('/post_movie', MovieCtrl.postMovie)
router.get('/get_movie', MovieCtrl.getMovies)
router.get('/get_version', MovieCounterCtrl.getVersion)
router.get('/get_movie/:movieId?', MovieCtrl.getMovies)
router.put('/update_movie/:movieId', MovieCtrl.updateMovie)
router.delete('/delete_movie/:movieId', MovieCtrl.deleteMovie)

module.exports = router
