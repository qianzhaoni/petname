const express = require('express');
const router = express.Router();
const { generateNames } = require('../controllers/nameController');

router.post('/generate', generateNames);

module.exports = router; 