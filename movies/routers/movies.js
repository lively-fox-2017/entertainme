const express = require('express')
const router = express.Router()
const MovieCtrl = require('../controllers/movies')

router.get('/', MovieCtrl.read)
router.get('/version', MovieCtrl.version)
router.get('/id/:id', MovieCtrl.readOne)
router.post('/', MovieCtrl.create)
router.put('/:id', MovieCtrl.update)
router.delete('/:id', MovieCtrl.delete)

module.exports = router
