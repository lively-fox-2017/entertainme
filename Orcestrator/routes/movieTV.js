var express = require('express');
var router = express.Router();
const controller = require('../controllers/orcesController')

/* GET users listing. */
router.get('/', controller.fetchAll);

module.exports = router;
