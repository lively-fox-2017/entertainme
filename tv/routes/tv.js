const express = require('express')
const router = express.Router()
const controller = require('../controllers/tv')

router.get('/', controller.getAll)
router.get('/:id', controller.getBy)
router.post('/', controller.add)
router.put('/:id', controller.edit)
router.delete('/:id', controller.delete)
module.exports = router