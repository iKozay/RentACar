const express = require("express");
const router = express.Router();
const auth_controller = require("./../controllers/authController");
const { authenticate } = require("./../config/passport");

router.post("/login", auth_controller.auth_login);

router.post("/signup", auth_controller.auth_signup);
module.exports = router;

router.get("/refreshToken", auth_controller.auth_refreshToken);

router.get("/user",authenticate, (req, res) => {
  res.status(200).json(req.user);
});

router.get("/logout", auth_controller.auth_logout);
