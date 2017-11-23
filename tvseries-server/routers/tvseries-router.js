let express = require('express')
let router = express.Router()
let tvseries = require('../controllers/tvseries-controllers')

router.get('/',tvseries.getTvseries)
router.post('/',tvseries.addTvseries)
router.put('/:id',tvseries.editTvseries)
router.delete('/:id',tvseries.deleteTvseries)

module.exports = router
