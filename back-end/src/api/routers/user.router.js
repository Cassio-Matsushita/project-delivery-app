const express = require('express');
const userController = require('../controllers/user.controller');
const userValidation = require('../middlewares/validateUser');

const router = express.Router();

router.post('/register', userValidation.userValidation, userController.createUser);
router.get('/users', userController.getAll);

module.exports = router;