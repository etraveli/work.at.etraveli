const express = require('express');
const router = express.Router();
const sessionsController = require('../controllers/sessionsController');

router.post('/login', sessionsController.create);
router.post('/signup', sessionsController.register);

module.exports = router;
