const express = require('express');
const router = express.Router();
const exampleController = require('../controllers/exampleController');

// GET example route
router.get('/', exampleController.getExamples);

// POST example route
router.post('/', exampleController.createExample);

module.exports = router;