var express = require('express');
var router = express.Router();
const movieControllers = require('../controllers/movies')

/* GET users listing. */

router.get('/', movieControllers.getmovie )
router.post('/', movieControllers.addmovie )


module.exports = router;
