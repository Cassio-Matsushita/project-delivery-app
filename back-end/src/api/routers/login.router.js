const express = require('express');
const loginController = require('../controllers/login.controller');
const userValidation = require('../middlewares/validateUser');

const router = express.Router();

router.post('/login', userValidation.userValidation, loginController.getUser);

module.exports = router;