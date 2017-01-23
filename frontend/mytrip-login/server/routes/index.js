const express = require('express');
const router = express.Router();
const sessionsController = require('../controllers/sessionsController');

router
  .post('/login', sessionsController.create);

module.exports = router;
