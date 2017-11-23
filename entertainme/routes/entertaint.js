var express = require('express');
var router = express.Router();
const entertaintController = require('../controllers/entertaint')

/* GET users listing. */

router.get('/', entertaintController.getAll )

module.exports = router;
