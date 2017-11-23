const express = require('express')
const router = express.Router()
const controller = require('../controllers/entertaiment')
router.get('/movie', controller.getMovie)
router.get('/tv', controller.getTv)
module.exports = router