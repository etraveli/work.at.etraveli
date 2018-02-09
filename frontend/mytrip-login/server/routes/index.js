const express = require('express');
const router = express.Router();
const sessionsController = require('../controllers/sessionsController');

router.post('/login', sessionsController.create);
router.post('/register', sessionsController.register);

module.exports = router;
