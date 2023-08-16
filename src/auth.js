const express = require('express');
const AuthController = require('./controllers/AuthController');
const router = express.Router();

router.post('/registar', AuthController.register);
router.post('/logar', AuthController.login);
//router.get('/utilizador/:id', AuthController.checktoken, AuthController.getUser);

module.exports = router;