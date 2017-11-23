const express = require('express');
const router = express.Router();

const EntertainMeController = require('../controllers/EntertainMeController');

router.get('/entertainme', EntertainMeController.fetchEntertainments);

module.exports = router;
