let express = require('express')
let router = express.Router()
let movie = require('../controllers/movie-controllers')

router.get('/',movie.getMovie)
router.post('/',movie.addMovie)
router.put('/:id',movie.editMovie)
router.delete('/:id',movie.deleteMovie)

module.exports = router
