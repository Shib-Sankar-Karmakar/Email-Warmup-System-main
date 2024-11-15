const express = require('express');
const router = express.Router();
const { setWarmupConfig } = require('../controllers/warmupController');

router.post('/set-config', setWarmupConfig);

module.exports = router;
