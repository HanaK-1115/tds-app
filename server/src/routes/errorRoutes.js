const express = require('express');
const { logError } = require('../controllers/errorController');
const router = express.Router();

router.post('/', logError);

module.exports = router;