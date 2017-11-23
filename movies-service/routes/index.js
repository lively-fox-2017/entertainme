const express = require('express');
const router = express.Router();

const MovieController = require('../controllers/MovieController');

router.get('/', MovieController.fetchAll);
router.post('/', MovieController.create);
router.get('/:id', MovieController.fetchById);
router.put('/:id', MovieController.update);
router.delete('/:id', MovieController.delete);

module.exports = router;
