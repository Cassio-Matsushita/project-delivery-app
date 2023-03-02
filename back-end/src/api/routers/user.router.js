const express = require('express');
const userController = require('../../api/controllers/user.controller');
const userValidation = require('../../api/middlewares/validateUser');

const router = express.Router();

router.post('/register', userValidation.userValidation, userController.createUser);

module.exports = router;