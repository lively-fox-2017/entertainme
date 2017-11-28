const express = require('express')
const router = express.Router()
const controller = require('../controllers/tvController')

router.get('/', controller.findAll)

router.post('/', controller.insert)

router.put('/:id', controller.update)

router.delete('/:id', controller.delete)

module.exports = router;
