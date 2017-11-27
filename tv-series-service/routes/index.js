const express = require('express');
const router = express.Router();

const TVSeriesController = require('../controllers/TVSeriesController');

router.get('/', TVSeriesController.fetchAll);
router.post('/', TVSeriesController.create);
router.get('/:id', TVSeriesController.fetchById);
router.put('/:id', TVSeriesController.update);
router.delete('/:id', TVSeriesController.delete);

module.exports = router;
