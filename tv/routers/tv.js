const express = require('express')
const router = express.Router()
const TvCtrl = require('../controllers/tv')

router.get('/', TvCtrl.read)
router.get('/:id', TvCtrl.readOne)
router.post('/', TvCtrl.create)
router.put('/:id', TvCtrl.update)
router.delete('/:id', TvCtrl.delete)

module.exports = router
