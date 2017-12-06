const express = require('express')
const router = express.Router()

const TvCtrl = require('../controllers/TvCtrl')
const TvCounterCtrl = require('../controllers/TvCounterCtrl')

router.post('/post_tv', TvCtrl.postTv)
router.get('/get_tv', TvCtrl.getTvs)
router.get('/get_version', TvCounterCtrl.getVersion)
router.get('/get_tv/:tvId?', TvCtrl.getTvs)
router.put('/update_tv/:tvId', TvCtrl.updateTv)
router.delete('/delete_tv/:tvId', TvCtrl.deleteTv)

module.exports = router
