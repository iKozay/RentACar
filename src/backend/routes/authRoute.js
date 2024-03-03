const express = require('express');
const router = express.Router();
const auth_controller=require('./../controllers/authController');

router.post('/login',auth_controller.auth_login);

router.post('/signup',auth_controller.auth_signup);
module.exports = router;