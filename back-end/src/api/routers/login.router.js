const express = require('express');
const loginController = require('../controllers/login.controller');
const userValidation = require('../middlewares/validateUser');
const middlewares = require('../middlewares/auth');

const router = express.Router();

router.post('/login', userValidation.userValidation, loginController.getUser);
router.get('/login/validate', middlewares.auth);

module.exports = router;