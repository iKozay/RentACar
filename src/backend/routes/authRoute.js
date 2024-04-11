const express = require('express');

const router = express.Router();
const authController = require('../controllers/authController');
const { authenticate } = require('../config/passport');

router.post('/login', authController.auth_login);

router.post('/signup', authController.auth_signup);

// router.get("/refreshToken", auth_controller.auth_refreshToken);

router.get('/user', authenticate, (req, res) => {
  res.status(200).json(req.user);
});
router.get('/checkToken', authController.auth_checkToken);
router.get('/logout', authController.auth_logout);
module.exports = router;
