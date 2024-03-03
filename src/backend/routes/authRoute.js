const express = require('express');
const router = express.Router();
const auth_controller=require('./../controllers/authController');

router.post('/login',(req,res)=>{

})

router.post('/signup',auth_controller.auth_signup);
module.exports = router;