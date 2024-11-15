const express = require('express');
const router = express.Router();
const { getEmailStats } = require('../controllers/reportController');

router.get('/stats', getEmailStats);

module.exports = router;
